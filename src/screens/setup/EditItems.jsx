import {
  Box,
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  useIsFocusVisible,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import Form from "../../components/Form";
import Select from "../../components/Select";
import TextField from "../../components/TextField";
import { useFetch, usePost, usePatch } from "../../hooks";
import { BASE_URL } from "../../utils/constants";

const EditItems = ({ items, loadData, close }) => {
  const [barcode, setBarcode] = useState();
  const navigate = useNavigate();
  const form = useRef();
  const priceRef = useRef();
  const itemNameRef = useRef();
  const itemSubCategoryRef = useRef();
  const canBeStockedRef = useRef();
  const barcodeRef = useRef();
  const [error, setError] = useState();

  const [formData, setFormData] = useState({
    User_ID: window.$user?.id,
    Branch_ID: window.$branch?.Branch_ID,
    Price: items.Item_Price?.Price || 0,
    ...items,
  });

  const {
    data: subcategoryList,
    loading: categoryLoading,
    error: categoryError,
  } = useFetch("api/setting/subcategory");

  const {
    data,
    loading,
    error: itemError,
    handlePatch,
  } = usePatch("api/setting/item", formData);

  

  const submit = () => {
    if (form.current.validate()) {
      handlePatch();
    }
  };

  useEffect(() => {
    if (data) {
      if (loadData) loadData();
      setTimeout(() => {
        close();
      }, 1000);
    }
  }, [data]);

  return (
    <>
      {loading ? <LinearProgress /> : null}
      <Form ref={form} onSubmit={submit}>
        <CardContent sx={{ padding: 2 }}>
          <Alert
            data={data}
            error={itemError}
            success={"Saved Successfully..."}
          />
          <Stack>
            <TextField
              label="Barcode"
              ref={barcodeRef}
              defaultValue={formData.Barcode}
              autoFocus
              sx={{ marginBottom: 2 }}
              fullWidth
              onChange={(value) =>
                setFormData({
                  ...formData,
                  Barcode: value,
                })
              }
            />
            <>
              <Grid container spacing={{ md: 2, sm: 1, xs: 1 }}>
                <Grid item xs={1} sm={1} md={4}>
                  <TextField
                    label="Item Name"
                    ref={itemNameRef}
                    defaultValue={formData.Item_Name}
                    fullWidth
                    autoFocus
                    required
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        Item_Name: value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={4}>
                  <Select
                    label="Item Subcategory"
                    fullWidth
                    ref={itemSubCategoryRef}
                    value={formData.SubCategory_ID}
                    optionsText="SubCategory_Name"
                    options={subcategoryList?.data?.data || []}
                    optionsValue="SubCategory_ID"
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        SubCategory_ID: value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={4}>
                  <Select
                    label="Can Be Stocked"
                    fullWidth
                    ref={canBeStockedRef}
                    value={formData.Can_Be_Stocked}
                    options={["Yes", "No"]}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        Can_Be_Stocked: value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={4}>
                  <TextField
                    label="Price"
                    ref={priceRef}
                    defaultValue={formData.Price}
                    fullWidth
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        Price: value,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Box flexGrow={1} />
          <Button variant="outlined" onClick={() => close()}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            disableElevation
            onClick={submit}>
            Save
          </Button>
        </CardActions>
      </Form>
    </>
  );
};

export default EditItems;

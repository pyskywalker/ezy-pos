import { CheckBox, Delete, Edit, Search } from "@mui/icons-material";

import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "../../components/Form";
import RadioButton from "../../components/RadioButton";
import Table from "../../components/Table";
import TextField from "../../components/TextField";
import { useFetch, usePost } from "../../hooks";
import { BASE_URL } from "../../utils/constants";
import { useSnackbar } from "notistack";
import { formatError } from "../../utils/helpers";

const StoreRoutes = ({ stockTakingType }) => {
  const barcodeFormRef = useRef();
  const formRef = useRef();
  const itemUnitRef = useRef();
  const itemPackageRef = useRef();
  const perPackageRef = useRef();
  const quantityRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const [focused, setFocused] = useState("");

  const [selectedButton, setSelectedButton] = useState();
  const [stockedList, setStockedList] = useState([]);
  const params = {
    Branch_ID: window.$branch?.Branch_ID,
    limit: 50,
  };

  const [dynamicParams, setDynamicParams] = useState({
    Item_Name: undefined,
  });

  const initialFormData = {
    Stock_Taking_Type: stockTakingType,
    Unit_Of_Measure: "pcs",
    Number_Of_Container: 1,
    Item_Per_Container: 1,
  };

  const [formData, setFormData] = useState({
    Stock_Taking_Type: stockTakingType,
    Unit_Of_Measure: "pcs",
    Number_Of_Container: 1,
    Item_Per_Container: 1,
  });

  const [barcode, setBarcode] = useState("");

  const handleSubmit = (e) => {
    let url = BASE_URL + "api/setting/item?Branch_ID=1&Sponsor_ID=1";
    e?.preventDefault();
    let auth = window.localStorage.getItem("auth");

    if (auth) {
      try {
        auth = JSON.parse(auth);
      } catch (error) {
        // ignore
      }
    }

    const headers = {
      Authorization: auth ? `${auth.type} ${auth.token}` : null,
    };
    if (barcode) {
      window.axios
        .get(url + `&Barcode=${barcode}`, { headers })
        .then((response) => {
          if (response?.data?.data?.data?.length == 1) {
            setSelectedButton(response.data.data.data[0]);
            setBarcode("");
          }
        })
        .catch((error) =>
          enqueueSnackbar(formatError(error), {
            variant: "error",
          })
        );
    }
  };

  const {
    data: itemList,
    loading: listLoading,
    error: loadError,
    handleFetch,
  } = useFetch(`api/setting/item`, {
    ...params,
    ...dynamicParams,
  });

  const {
    data: stockItems,
    loading: stockLoading,
    error: stockError,
    handleFetch: fetchStock,
  } = useFetch(`api/store/stock-taking`, {
    Branch_ID: window.$branch?.Branch_ID,
    Stock_Taking_Type: stockTakingType,
    User_ID: window.$user.User_ID,
    Stock_Status: "Pending",
  });

  const {
    data: postData,
    loading,
    error,
    handlePost,
  } = usePost(`api/store/stock-taking`, {
    ...formData,
    Branch_ID: window.$branch?.Branch_ID,
    Item_ID: selectedButton?.Item_ID,
    User_ID: window.$user.User_ID,
    Item_Quantity:
      parseInt(formData?.Number_Of_Container || 0) *
      parseInt(formData?.Item_Per_Container || 0),
  });

  const submitHandle = () => {
    if (formRef.current.validate()) handlePost();
  };

  useEffect(() => {
    if (postData) {
      fetchStock();
      setFormData({ ...initialFormData });
      setSelectedButton(undefined);
      formRef.current?.clear();
    }
  }, [postData]);

  const submitFinal = () => {};

  // const {
  //   data,
  //   error: finalError,
  //   handlePatch,
  // } = usePatch(`api/store/stock-taking`,);

  const columns = React.useMemo(
    () => [
      {
        field: "index",
        headerName: "S/N",
        sortable: false,
        valueGetter: (item, index) => index + 1,
      },
      {
        field: "Item_Name",
        headerName: "Item",
        valueGetter: (item, index) => item.items?.Item_Name,
        sortable: false,
      },
      {
        field: "Unit",
        headerName: "Unit",
        valueGetter: (item, index) => item?.Unit,
      },
      {
        field: "Number_Of_Container",
        headerName: "Number of Packages",
        valueGetter: (item, index) => item?.Number_Of_Container,
      },
      {
        field: "Items_Per_Container",
        headerName: "Items Per Package",
        valueGetter: (item, index) => item?.Item_Per_Container,
        sortable: false,
      },
      {
        field: "Quantity",
        headerName: "Quantity",
        valueGetter: (item, index) => item?.Item_Quantity,
        sortable: false,
      },
      {
        field: "Buying_Price",
        headerName: "Buying Price",
        sortable: false,
      },
      {
        field: "Remove",
        headerName: "Remove",
        sortable: false,
        renderCell: (item) => (
          <IconButton>
            <Delete />
          </IconButton>
        ),
      },
    ],
    [params]
  );

  return (
    <Grid container spacing={{ xs: 2, sm: 2, md: 5 }}>
      <Grid item xs={12} md={3} sm={8}>
        <Paper sx={{ padding: 4 }}>
          <Typography
            align="left"
            sx={{
              color: (theme) => theme.palette.grey,
              marginBottom: "10px",
              fontSize: "20px",
              paddingLeft: 2,
            }}>
            Items List
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack>
            <Grid
              container
              spacing={{ sm: 2, md: 2, xs: 1 }}
              sx={{ paddingX: 2, marginBottom: 2 }}>
              <Grid
                item
                md={focused ? (focused == "Barcode" ? 3 : 9) : 6}
                sm={9}
                xs={9}>
                <TextField
                  fullWidth
                  endIcon={<Search />}
                  placeholder="Item"
                  onFocus={() => setFocused("Item Name")}
                  onChange={(value) =>
                    setDynamicParams({ ...dynamicParams, Item_Name: value })
                  }
                />
              </Grid>
              <Grid
                item
                md={focused ? (focused == "Item Name" ? 3 : 9) : 6}
                sm={9}
                xs={9}>
                <Form ref={barcodeFormRef} onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    endIcon={<Search />}
                    value={barcode}
                    autoFocus
                    placeholder="Barcode"
                    onFocus={() => setFocused("Barcode")}
                    onChange={(value) => setBarcode(value)}
                  />
                </Form>
              </Grid>
            </Grid>
            <Stack sx={{ maxHeight: 300, overflowY: "auto", paddingX: 2 }}>
              {itemList?.data?.data.map((item, index) => (
                <RadioButton
                  key={index}
                  label={item.Item_Name}
                  checked={selectedButton === item}
                  onChange={(event) =>
                    setSelectedButton(event.target.checked ? item : undefined)
                  }
                />
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9} sm={8}>
        <Stack spacing={4}>
          <Paper sx={{ padding: 4 }}>
            <Form ref={formRef}>
              <Grid container spacing={{ xs: 2, sm: 2, md: 2 }}>
                <Grid item sm={8} xs={12} md={3}>
                  <TextField
                    label="Item Name"
                    fullWidth
                    disabled
                    value={selectedButton?.Item_Name || " "}
                  />
                </Grid>

                <Grid item sm={4} xs={8} md={1}>
                  <TextField
                    label="Unit"
                    ref={itemUnitRef}
                    required
                    fullWidth
                    value={selectedButton ? formData.Unit_Of_Measure : null}
                    onChange={(value) =>
                      setFormData({ ...formData, Unit_Of_Measure: value })
                    }
                  />
                </Grid>
                <Grid item sm={4} xs={8} md={1}>
                  <TextField
                    label="Package"
                    ref={itemPackageRef}
                    value={selectedButton ? formData.Number_Of_Container : null}
                    fullWidth
                    required
                    onChange={(value) =>
                      setFormData({ ...formData, Number_Of_Container: value })
                    }
                  />
                </Grid>
                <Grid item sm={4} xs={8} md={2}>
                  <TextField
                    label="Per Package"
                    ref={perPackageRef}
                    value={selectedButton ? formData.Item_Per_Container : null}
                    fullWidth
                    required
                    onChange={(value) =>
                      setFormData({ ...formData, Item_Per_Container: value })
                    }
                  />
                </Grid>
                <Grid item sm={4} xs={8} md={1}>
                  <TextField
                    label="Quantity"
                    disable
                    fullWidth
                    value={
                      selectedButton
                        ? parseInt(formData.Number_Of_Container || 0) *
                          parseInt(formData.Item_Per_Container || 0)
                        : " "
                    }
                  />
                </Grid>
                <Grid item sm={4} xs={8} md={2}>
                  <TextField
                    label="Buying Price"
                    fullWidth
                    value={selectedButton ? formData.Buying_Price : null}
                    onChange={(value) =>
                      setFormData({ ...formData, Buying_Price: value })
                    }
                  />
                </Grid>
                {/* <Grid item sm={4} xs={8} md={2}>
                <TextField label="Expire Date" fullWidth />
              </Grid> */}
                <Grid item sm={4} xs={8} md={1}>
                  <Button
                    onClick={submitHandle}
                    fullWidth
                    sx={{ marginTop: 3 }}
                    disableElevation
                    variant="contained"
                    disabled={loading}
                    color="primary">
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Paper>
          <Paper sx={{ paddingY: 2, paddingX: 4 }}>
            <Table
              items={stockItems?.data?.length ? stockItems?.data[0]?.item : []}
              columns={columns}
              wrapperStyles={{ maxHeight: 500, overflowY: "auto" }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 5,
              }}>
              <Button
                disableElevation
                variant="contained"
                color="primary"
                onClick={submitFinal}>
                Proccess {stockTakingType == "Grn" ? "GRN" : "Stock"}
              </Button>
            </Box>
          </Paper>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default StoreRoutes;

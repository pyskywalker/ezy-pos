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
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import Form from "../../components/Form";
import Select from "../../components/Select";
import TextField from "../../components/TextField";
import { useFetch, usePost } from "../../hooks";
import { getCurrentUser } from "../../rtk/UserSlice";

import { BASE_URL } from "../../utils/constants";

const AddItems = ({ close, loadData }) => {
  const [barcode, setBarcode] = useState();

  const currentUser = useSelector(getCurrentUser);

  const navigate = useNavigate();
  const barcodeFormRef = useRef();
  const priceRef = useRef();
  const itemNameRef = useRef();
  const itemSubCategoryRef = useRef();
  const [successMessage, setSuccessMessage] = useState("");
  const canBeStockedRef = useRef();
  const barcodeRef = useRef();
  const [error, setError] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const sponsorRef = useRef();

  const auth = {
    User_ID: currentUser.user?.User_ID,
    Branch_ID: window.$branch?.Branch_ID,
  };

  const initialFormData = {
    Item_Name: undefined,
    Price: undefined,
    Sponsor_ID: undefined,
    SubCategory_ID: undefined,
    Can_Be_Stocked: undefined,
    Price: "0",
  };

  const [formData, setFormData] = useState({
    Item_Name: undefined,
    Price: undefined,
    Sponsor_ID: undefined,
    SubCategory_ID: undefined,
    Can_Be_Stocked: undefined,
    Price: "0",
  });

  const {
    data: subcategoryList,
    loading: categoryLoading,
    error: categoryError,
  } = useFetch("api/setting/subcategory");

  const {
    data: sponsorList,
    loading: sponsorLoading,
    error: sponsorError,
    handleFetch,
  } = useFetch("api/setting/sponsor/", null, true);

  const barcodeSubmit = (e) => {
    e.preventDefault();

    if (barcodeFormRef.current.validate()) {
      let url =
        BASE_URL +
        `api/setting/item?Branch_ID=${window.$branch.Branch_ID}&Sponsor_ID=1`;
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

      window.axios
        .get(url + `&Barcode=${barcode}`, { headers })
        .then((response) => {
          if (response?.data?.data?.data?.length) {
            setError("This Item Barcode Already Exists");
          } else {
            setIsVisible(true);
            setSuccessMessage("Barcode Verified");
          }
        })
        .catch((error) => setError(error));

      ///search if barcode exists
    }
  };

  const {
    data: successData,
    loading,
    error: postItemError,
    handlePost,
  } = usePost("api/setting/item", { ...formData, ...auth, Barcode: barcode });

  const createNewItem = () => {
    if (
      itemNameRef.current?.validate() &&
      itemSubCategoryRef.current?.validate() &&
      canBeStockedRef.current?.validate()
    ) {
      handlePost();
    }
  };

  useEffect(() => {
    if (successData) {
      loadData && loadData();
      barcodeRef.current.setValue("");
      setIsVisible(false);
      setFormData(initialFormData);
      setSuccessMessage("Saved Successfully.");
      setTimeout(() => {
        close();
      }, 1000);
    }
  }, [successData]);

  useEffect(() => {
    if (postItemError) {
      setError(postItemError);
    }
  }, [postItemError]);

  useEffect(() => {
    if (sponsorList) {
      if (sponsorList.data?.data?.length) {
        setFormData({
          ...formData,
          Sponsor_ID: sponsorList.data.data[0]?.Sponsor_ID,
        });
        sponsorRef.current?.setValue(sponsorList.data.data[0]?.Sponsor_ID);
      }
    }
  }, [sponsorList]);

  return (
    <>
      {loading ? <LinearProgress /> : null}
      <CardContent sx={{ padding: 2 }}>
        <Alert data={successMessage} error={error} success={successMessage} />
        <Stack>
          <Form ref={barcodeFormRef} onSubmit={barcodeSubmit}>
            <TextField
              label="Barcode"
              ref={barcodeRef}
              autoFocus={true}
              sx={{ marginBottom: 2 }}
              fullWidth
              //   required
              disabled={isVisible}
              onChange={(value) => setBarcode(value)}
            />
          </Form>

          <>
            <Grid container spacing={{ md: 2, sm: 1, xs: 1 }}>
              <Grid item xs={1} sm={1} md={4}>
                <TextField
                  label="Item Name"
                  ref={itemNameRef}
                  fullWidth
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
              {sponsorList?.data?.data?.length > 1 ? (
                <Grid item md={4} sm={6} xs={12}>
                  <Select
                    label="Sponsor"
                    fullWidth
                    ref={sponsorRef}
                    optionsText="Sponsor_Name"
                    value={sponsorList?.data?.data ? formData.Sponsor_ID : " "}
                    options={sponsorList?.data?.data || []}
                    optionsValue="Sponsor_ID"
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        Sponsor_ID: value,
                      })
                    }
                  />
                </Grid>
              ) : null}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Price"
                  ref={priceRef}
                  fullWidth
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      Price: value,
                    })
                  }
                />
              </Grid>
              {/* <Grid item xs={1} sm={1} md={4}>
                                    <TextField
                                        label="Price"
                                        ref={priceRef}
                                        fullWidth
                                        required
                                        onChange={(value) =>
                                            setFormData({
                                                ...formData,
                                                Price: value,
                                            })
                                        }
                                    />
                                </Grid> */}
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
          onClick={createNewItem}>
          Save
        </Button>
      </CardActions>
    </>
  );
};

export default AddItems;

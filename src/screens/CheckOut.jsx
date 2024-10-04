import { Fastfood, Search } from "@mui/icons-material";
import {
  Grid,
  Paper,
  Box,
  Button,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import {
  amber,
  blueGrey,
  indigo,
  lightGreen,
  orange,
  red,
} from "@mui/material/colors";
import { Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import Form from "../components/Form";
import ItemCards, { ValCard } from "../components/ItemCards";
import TextField from "../components/TextField";
import { useFetch } from "../hooks";
import { BASE_URL } from "../utils/constants";
import CheckOutListItems from "./checkout-components/CheckOutListItems";

import { useSelector, useDispatch } from "react-redux";

import { getCurrentCompany } from "../rtk/CompanySlice";
import { formatError, numberFormat, reportErrors } from "../utils/helpers";
import Alert from "../components/Alert";
import { useSnackbar } from "notistack";
import Select from "../components/Select";

const categoryButtons = [
  "Food and Beverages",
  "Cosmetics",
  "Stationaries",
  "Shoes and Clothes",
  "Electronics",
  "Baby Products",
];

const Muicolors = ["#7986cb", "#e57373", "#ffd54f", "#aed581", "#ffa726"];

const CheckOut = () => {
  const array = new Array(10).fill("me");
  const sponsorRef = useRef();

  const itemSearchFieldRef = useRef();

  const company = useSelector(getCurrentCompany);

  const auth = {
    Branch_ID: window.$branch?.Branch_ID,
  };
  let errorVariant = "error";
  let successVariant = "success";
  const { enqueueSnackbar } = useSnackbar();
  const [sideItemsList, setSideItemsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    Sponsor_ID: undefined,
    Item_Name: undefined,
    Category_ID: undefined,
    limit: 12,
  });
  const [barcode, setBarcode] = useState("");
  const {
    data: sponsorList,
    loading: sponsorLoading,
    error: sponsorError,
    handleFetch,
  } = useFetch("api/setting/sponsor/", null, true);

  useEffect(() => {
    if (sponsorList) {
      if (sponsorList.data.data.length) {
        setParams({
          ...params,
          Sponsor_ID: sponsorList.data.data[0]?.Sponsor_ID,
        });
        // sponsorRef.current?.setValue(sponsorList.data.data[0]?.Sponsor_ID);
      }
    }
  }, [sponsorList]);

  const deleteCacheItem = (index) => {
    setSideItemsList([...sideItemsList.filter((val, i) => i !== index)]);
  };

  const STORENAME = company.Company_Name;

  const loadReceipt = () => {};

  const {
    data: categoryList,
    loading: categoryLoading,
    error: categoryError,
  } = useFetch("api/setting/category");

  const {
    data: itemList,
    loading: listLoading,
    error: loadingError,
  } = useFetch("api/setting/item", { ...params, ...auth });

  const payForItems = () => {
    if (!sideItemsList?.length) {
      return enqueueSnackbar("Please select items before paying", {
        variant: errorVariant,
      });
    }
    let url = BASE_URL + "api/ordering/ordering-item";

    let formData = {
      Sponsor_ID: "1",
      Customer_Name: "",
      Customer_Tin_Number: "",
      Branch_ID: window.$branch?.Branch_ID,
      User_ID: 1,
      Items: sideItemsList,
    };
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
      .post(url, formData, { headers })
      .then((response) => {
        enqueueSnackbar("Successfully Paid For", {
          variant: successVariant,
        });
        setTimeout(() => {
          setSideItemsList([]);
        }, 300);
        let { Ordering_Receipt_ID } = response.data.data;
        loadReceipt(Ordering_Receipt_ID);
      })
      .catch((error) =>
        enqueueSnackbar(formatError(error), { variant: errorVariant })
      );
  };

  useEffect(() => {
    if (categoryError) {
    }
    if (loadingError) {
    }
  }, [categoryError, loadingError]);

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

    window.axios
      .get(url + `&Barcode=${barcode}`, { headers })
      .then((response) => {
        if (response?.data?.data?.data?.length == 1) {
          clickItem(response.data.data.data[0]);
        }
      })
      .catch((error) => setError(error));
  };
  const clickItem = (item) => {
    let itemExists = sideItemsList.find((val) => val.Item_ID == item.Item_ID);
    if (itemExists) {
      let previousQuantity = itemExists.Quantity || 0;
      setSideItemsList(
        sideItemsList.map((val) =>
          val.Item_ID == item.Item_ID
            ? { ...itemExists, Quantity: (previousQuantity += 1) }
            : val
        )
      );
    } else {
      setSideItemsList([
        ...sideItemsList,
        {
          ...item,
          Quantity: 1,
          Item_ID: item.Item_ID,
          Item_Name: item.Item_Name,

          Price: item.price?.Price || 0,
        },
      ]);
    }
    itemSearchFieldRef.current.setValue("");
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const [error, setError] = useState();

  const totalPice = sideItemsList?.reduce(
    (acc, curr) =>
      acc +
      parseFloat(curr.Quantity || 0) * parseFloat(curr.Item_Price?.Price || 0),
    0
  );

  return (
    <>
      {/* <Alert successMessage={successMessage} error={error} success={success} /> */}
      <Grid
        variant="outlined"
        container
        spacing={{ xs: 2, sm: 2, md: 5 }}
        sx={{ padding: 0 }}>
        <Grid item md={9} sm={12} xs={12} sx={{ marginBottom: 3 }}>
          <Stack sx={{ maxHeight: "80vh", minHeight: "80vh" }}>
            <Grid container spacing={{ xs: 2, sm: 2, md: 4 }}>
              {sponsorList?.data?.data?.length > 1 ? (
                <Grid item md={2} sm={6} xs={12}>
                  <Select
                    placeholder="Sponsor"
                    fullWidth
                    ref={sponsorRef}
                    optionsText="Sponsor_Name"
                    size="large"
                    value={sponsorList?.data?.data && params.Sponsor_ID}
                    options={sponsorList?.data?.data || []}
                    optionsValue="Sponsor_ID"
                    onChange={(value) =>
                      setParams({
                        ...params,
                        Sponsor_ID: value,
                      })
                    }
                  />
                </Grid>
              ) : null}

              <Grid item md={6} sm={8} xs={12}>
                <TextField
                  endIcon={<Search />}
                  placeholder="Search product in keywords"
                  containerProps={{
                    marginBottom: 3,
                    width: "100%",
                  }}
                  size="large"
                  sx={{
                    width: "100%",
                  }}
                  onChange={(value, input) => {
                    setParams({
                      ...params,
                      Item_Name: value,
                    });
                  }}
                />
              </Grid>
              <Grid item md={4} sm={4} xs={12}>
                <Form onSubmit={handleSubmit}>
                  <TextField
                    ref={itemSearchFieldRef}
                    endIcon={<Search />}
                    placeholder="Search Barcode..."
                    autoFocus
                    containerProps={{
                      marginBottom: 3,
                      width: "100%",
                    }}
                    size="large"
                    sx={{
                      width: "100%",
                    }}
                    onChange={(value, input) => {
                      setBarcode(value);
                    }}
                  />
                </Form>
              </Grid>
            </Grid>

            <Grid
              component="div"
              container
              spacing={{ xs: 2, sm: 2, md: 4 }}
              sx={{ marginBottom: 4 }}>
              {itemList?.data?.data?.map((val, index) => (
                <ItemCards
                  key={index}
                  index={index}
                  item={val}
                  onClick={clickItem}
                />
              ))}
            </Grid>
            <Box sx={{ flexGrow: 1 }} />
            <Grid container component="div" spacing={{ xs: 2, sm: 2, md: 3 }}>
              {categoryList?.data?.data
                ?.filter((e, i) => i < 4)
                .map((val, index) => (
                  <Grid md={3} item sm={12} xs={12} key={index}>
                    <Button
                      fullWidth
                      disableElevation
                      variant="contained"
                      color={index % 2 ? "primary" : "secondary"}
                      size="large"
                      sx={{
                        height: 60,
                        fontSize: "16px",
                      }}
                      onClick={() =>
                        setParams({
                          ...params,
                          Category_ID: val.Category_ID,
                        })
                      }>
                      {val.Category_Name}
                    </Button>
                  </Grid>
                ))}
            </Grid>
          </Stack>
        </Grid>
        <Grid item md={3} sm={12} xs={12} sx={{ paddingTop: 3 }}>
          <Paper sx={{ height: "80vh", paddingX: 2 }}>
            <Stack height="100%">
              <Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={2}
                  sx={{ height: "8vh", px: 2 }}>
                  <Avatar
                    sx={{
                      height: 50,
                      width: 50,
                      backgroundColor: (theme) => theme.palette.secondary.main,
                    }}
                  />
                  <Stack>
                    <Typography variant="h6">{STORENAME}</Typography>
                    <Typography>
                      {JSON.parse(localStorage.getItem("branch")).Branch_Name}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider />
                <List
                  sx={{
                    width: "100%",
                    height: "60vh",
                    overflow: "auto",
                    // maxWidth: 360,
                    // bgcolor: "background.paper",
                  }}>
                  {sideItemsList.map((item, index) => (
                    <CheckOutListItems
                      item={item}
                      index={index}
                      deleteCacheItem={deleteCacheItem}
                      setSideItemsList={setSideItemsList}
                    />
                  ))}
                </List>
              </Stack>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ width: "100%", padding: 2 }}>
                <Button
                  // disabled={loading}
                  fullWidth
                  disableElevation
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{
                    height: 50,
                    justifyContent: "space-evenly",
                  }}
                  onClick={payForItems}>
                  <Typography fontSize={20}>Pay</Typography>
                  <Typography fontSize={20}>
                    {numberFormat(totalPice)} tsh
                  </Typography>
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CheckOut;

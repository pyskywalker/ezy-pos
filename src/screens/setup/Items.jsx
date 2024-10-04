import React, { useMemo, useRef, useState, useEffect } from "react";
import { Edit } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import Table from "../../components/Table";
import { Search } from "@mui/icons-material";
import Select from "../../components/Select";
import Modal from "../../components/Modal";
import { useFetch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import AddItems from "./AddItems";
import EditItems from "./EditItems";
import { useSelector } from "react-redux";

import TextField from "../../components/TextField";

const Items = ({ setQuickActions }) => {
  const navigate = useNavigate();
  const modalRef = useRef();

  const sponsorRef = useRef();

  const [params, setParams] = useState({
    Branch_ID: window.$branch?.Branch_ID,
    Sponsor_ID: undefined,
    Item_Name: undefined,
  });

  const {
    data: sponsorList,
    loading: sponsorLoading,
    error: sponsorError,
    handleFetch: doFetch,
  } = useFetch("api/setting/sponsor/", null, true);

  const {
    data: itemList,
    loading: listLoading,
    error: loadError,
    handleFetch,
  } = useFetch(`api/setting/item`, { ...params });

  const addItemModal = () => {
    let component = (
      <AddItems loadData={handleFetch} close={() => modalRef.current.close()} />
    );
    modalRef.current.open("Add Item", component);
  };

  const editItem = (item) => {
    let component = (
      <EditItems
        loadData={handleFetch}
        items={item}
        close={() => modalRef.current.close()}
      />
    );
    modalRef.current.open("Edit Item", component);
  };
  const columns = useMemo(
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
        sortable: false,
      },
      {
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (item) => (
          <IconButton onClick={() => editItem(item)}>
            <Edit />
          </IconButton>
        ),
      },
    ],
    [params]
  );

  useEffect(() => {
    if (sponsorList) {
      if (sponsorList.data.data.length) {
        setParams({
          ...params,
          Sponsor_ID: sponsorList.data.data[0]?.Sponsor_ID,
        });
        sponsorRef.current?.setValue(sponsorList.data.data[0]?.Sponsor_ID);
      }
    }
  }, [sponsorList]);

  useEffect(() => {
    setQuickActions([
      {
        label: "Add Items",
        name: "add_items",
        onClick: () => addItemModal(),
      },
      {
        label: "Item Categories",
        name: "view_item_categories",
        onClick: () => navigate("/private/setup"),
      },
      {
        label: "Item Subcategories",
        name: "view_item_subcategories",
        onClick: () => navigate("/private/setup/subcategories"),
      },
      {
        label: "Sponsors",
        name: "view_sponsors",
        onClick: () => navigate("/private/setup/sponsors"),
      },
    ]);
  }, []);

  return (
    <>
      <Paper sx={{ padding: 2, height: "80vh" }}>
        <Typography
          align="left"
          sx={{
            color: (theme) => theme.palette.grey,
            marginBottom: "10px",
            fontSize: "20px",
            py: 2,
          }}>
          Items List
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={{ md: 2, sm: 4 }}>
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
          {sponsorList?.data?.data?.length > 1 ? (
            <Grid item md={2} sm={6} xs={12}>
              <Select
                placeholder="Sponsor"
                fullWidth
                ref={sponsorRef}
                optionsText="Sponsor_Name"
                size="large"
                value={sponsorList?.data?.data ? params.Sponsor_ID : " "}
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
        </Grid>

        <Table
          items={itemList?.data?.data || []}
          columns={columns}
          wrapperStyles={{ height: "55vh", overflowY: "auto" }}
        />
      </Paper>
      <Modal ref={modalRef} />
    </>
  );
};

export default Items;

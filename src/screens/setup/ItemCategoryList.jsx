import { Edit } from "@mui/icons-material";
import { Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import React, { useMemo, useRef, useState, useEffect } from "react";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { useFetch } from "../../hooks";
import EditItemCatogories from "./EditItemCatogories";
import { useNavigate } from "react-router-dom";
import AddItemCategory from "./AddItemCategory";

const ItemCategoryList = ({ setQuickActions }) => {
  const modalRef = useRef();
  const navigate = useNavigate();

  const {
    data: categoryList,
    loading,
    error,
    handleFetch,
  } = useFetch("api/setting/category/", null, true);

  const addItemCategoryModal = () => {
    let component = (
      <AddItemCategory
        loadData={handleFetch}
        close={() => modalRef.current.close()}
      />
    );
    modalRef.current.open("Add Item Category", component);
  };

  useEffect(() => {
    setQuickActions([
      {
        label: "Add Item Categories",
        name: "add_item_category",
        onClick: () => addItemCategoryModal(),
      },
      {
        label: "Items",
        name: "items",
        onClick: () => navigate("/private/setup/items"),
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

  const editItemCategoryModal = (item) => {
    let component = (
      <EditItemCatogories
        close={() => modalRef.current.close()}
        loadData={handleFetch}
        item={item}
      />
    );
    modalRef.current.open("Edit Item Category", component);
  };

  const [params, setParams] = useState({});
  const columns = useMemo(
    () => [
      {
        field: "index",
        headerName: "S/N",
        sortable: false,
        valueGetter: (item, index) => index + 1,
      },
      {
        field: "Category_Name",
        headerName: "Category",
        sortable: false,
      },
      {
        field: "Category_Name",
        headerName: "Action",
        sortable: false,
        renderCell: (item) => (
          <IconButton onClick={() => editItemCategoryModal(item)}>
            <Edit />
          </IconButton>
        ),
      },
    ],
    [params]
  );

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
          Item Categories
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Table
          items={categoryList?.data?.data || []}
          columns={columns}
          wrapperStyles={{ height: "60vh", overflowY: "auto" }}
        />
      </Paper>
      <Modal ref={modalRef} />
    </>
  );
};

export default ItemCategoryList;

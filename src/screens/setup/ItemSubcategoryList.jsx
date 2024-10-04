import { Edit } from "@mui/icons-material";
import { Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import React, { useMemo, useRef, useState, useEffect } from "react";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { useFetch } from "../../hooks";
import EditItemCatogories from "./EditItemCatogories";
import { useNavigate } from "react-router-dom";
import EditItemSubCategory from "./EditItemSubcategory";
import AddItemSubcategory from "./AddItemSubcategory";

const ItemSubcategoryList = ({ setQuickActions }) => {
  const modalRef = useRef();
  const navigate = useNavigate();

  const {
    data: subcategoryList,
    loading,
    error,
    handleFetch,
  } = useFetch("api/setting/subcategory/", null, true);

  const addItemSubCategoryModal = () => {
    let component = (
      <AddItemSubcategory
        loadData={handleFetch}
        close={() => modalRef.current.close()}
      />
    );
    modalRef.current.open("Add Item Subcategory", component);
  };

  useEffect(() => {
    setQuickActions([
      {
        label: "Add Subcategories",
        name: "add_sub_category",
        onClick: () => addItemSubCategoryModal(),
      },
      {
        label: "Items",
        name: "items",
        onClick: () => navigate("/private/setup/items"),
      },
      {
        label: "Item Categories",
        name: "view_item_categories",
        onClick: () => navigate("/private/setup"),
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
      <EditItemSubCategory
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
        field: "SubCategory_Name",
        headerName: "Subcategory",
        sortable: false,
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
          Item Subcategories
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Table
          items={subcategoryList?.data?.data || []}
          columns={columns}
          wrapperStyles={{ height: "67.5vh", overflowY: "auto" }}
        />
      </Paper>
      <Modal ref={modalRef} />
    </>
  );
};

export default ItemSubcategoryList;

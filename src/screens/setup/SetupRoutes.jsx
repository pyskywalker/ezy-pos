import React, { useEffect, useState, useRef } from "react";
import ItemList from "../store/ItemList";
import AddItemSubcategory from "./AddItemSubcategory";
import ItemCategoryList from "./ItemCategoryList";
import ItemSubcategoryList from "./ItemSubcategoryList";
import Modal from "../../components/Modal";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AddItemCategory from "./AddItemCategory";
import Items from "./Items";
import AddItems from "./AddItems";
import Sponsors from "./Sponsors";

const SetupRoutes = () => {
  const modalRef = useRef();
  const location = useLocation();
  const [quickActions, setQuickActions] = useState([]);
  const navigate = useNavigate();
  const addItemSubCategoryModal = () => {};

  const addItemCategoryModal = (loadData) => {
    let component = (
      <AddItemCategory
        loadData={loadData}
        close={() => modalRef.current.close()}
      />
    );
    modalRef.current.open("Edit Item Category", component);
  };

  useEffect(() => {
    // if (location.pathname.indexOf("/items") === -1) {
    //     setQuickActions([
    //         {
    //             label: "Items",
    //             name: "items",
    //             onClick: () => navigate("/private/setup/items"),
    //         },
    //         {
    //             label: "Item Categories",
    //             name: "view_item_categories",
    //             onClick: () => navigate("/private/setup/"),
    //         },
    //         {
    //             label: "Item Subcategories",
    //             name: "view_item_subcategories",
    //             onClick: () => navigate("/private/setup/subcategories"),
    //         },
    //         {
    //             label: "Add Item Categories",
    //             name: "add_item_category",
    //             onClick: () => addItemCategoryModal(),
    //         },
    //         {
    //             label: "Add Item Subcategories",
    //             name: "add_item_subcategory",
    //             onClick: () => addItemSubCategoryModal(),
    //         },
    //     ]);
    // }
  }, []);

  return (
    <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} sx={{ padding: 0 }}>
      <Grid item xs={12} md={quickActions.length ? 9 : 12}>
        <Box sx={{ paddingX: "4px" }}>
          <Routes>
            <Route
              path="/"
              exact={true}
              element={<ItemCategoryList setQuickActions={setQuickActions} />}
            />
            <Route
              path="/subcategories"
              element={
                <ItemSubcategoryList setQuickActions={setQuickActions} />
              }
            />
            <Route
              path="/items"
              element={<Items setQuickActions={setQuickActions} />}
            />
            <Route
              path="/sponsors"
              element={<Sponsors setQuickActions={setQuickActions} />}
            />
            <Route
              path="/add-items"
              element={<AddItems setQuickActions={setQuickActions} />}
            />
          </Routes>
        </Box>
      </Grid>
      {quickActions.length ? (
        <Grid item xs={4} md={3}>
          <Box sx={{ paddingX: "4px" }}>
            <Paper
              variant="outlined"
              sx={{
                paddingX: 4,
                height: "80vh",
                overflowY: "auto",
                paddingY: 2,
              }}>
              <Typography
                align="center"
                sx={{
                  color: (theme) => theme.palette.grey,
                  marginBottom: "10px",
                  fontSize: "20px",
                }}>
                Quick Actions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}>
                {quickActions.map((item) => (
                  <ListItemButton
                    key={item.name}
                    dense={true}
                    alignItems="center"
                    onClick={item.onClick}
                    sx={{
                      minHeight: 30,
                      borderRadius: "10px",
                      paddingY: "10px",
                      display: "flex",
                      justifyContent: "center",

                      "&.MuiListItemButton-root": {
                        backgroundColor: (theme) =>
                          item.backgroundColor
                            ? item.backgroundColor(theme)
                            : theme.palette.primary.main,
                        color: (theme) =>
                          item.textColor ? item.textColor(theme) : "white",
                      },
                    }}>
                    {item.label}
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          </Box>
        </Grid>
      ) : null}
      <Modal ref={modalRef} />
    </Grid>
  );
};

export default SetupRoutes;

import { Remove } from "@mui/icons-material";
import {
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import TextField from "../../components/TextField";
import CleanHandsIcon from "@mui/icons-material/CleanHands";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import DevicesIcon from "@mui/icons-material/Devices";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  amber,
  indigo,
  lightGreen,
  orange,
  purple,
  red,
} from "@mui/material/colors";
import { getValidationRules, numberFormat } from "../../utils/helpers";

const validationRules = getValidationRules();

const CheckOutListItems = ({
  item,
  setData,
  data,
  index,
  deleteCacheItem,
  setSideItemsList,
}) => {
  const quantityRef = useRef();
  const categories = {
    "Food and Beverages": {
      icon: <FastfoodIcon sx={{ height: 28, width: 28 }} />,
    },
    Cosmetics: {
      icon: <CleanHandsIcon sx={{ height: 28, width: 28 }} />,
    },
    Stationaries: {
      icon: <LocalPrintshopIcon sx={{ height: 28, width: 28 }} />,
    },
    "Shoes and Clothes": {
      icon: <CheckroomIcon sx={{ height: 28, width: 28 }} />,
    },
    Electronics: {
      icon: <DevicesIcon sx={{ height: 28, width: 28 }} />,
    },
  };

  useEffect(() => {
    if (item.Quantity) {
      quantityRef.current.setValue(item.Quantity);
    }
  }, [item.Quantity]);

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        borderTop: "8px solid",
        borderColor: (theme) =>
          index % 2 ? theme.palette.primary.main : theme.palette.secondary.main,
      }}
      secondaryAction={
        <IconButton onClick={() => deleteCacheItem(index)}>
          <DeleteIcon />
        </IconButton>
      }>
      <ListItemIcon>
        <TextField
          ref={quantityRef}
          defaultValue={item.Quantity}
          sx={{
            width: "45px",
            heigth: "100%",
            display: "flex",
            alignItems: "center",
          }}
          rules={[validationRules.number]}
          required
          onChange={(value) => {
            if (value !== item.Quantity) {
              let item2 = item;
              item2["Quantity"] = value;
              setSideItemsList((prev) =>
                prev.map((e, i) => (i == index ? item2 : e))
              );
            }
          }}
        />
      </ListItemIcon>

      <ListItemIcon
        sx={{
          color: (theme) =>
            index % 2
              ? theme.palette.primary.main
              : theme.palette.secondary.main,
        }}>
        {categories[item.Category_Name]?.icon || <CheckroomIcon />}
      </ListItemIcon>
      <ListItemText
        primary={item.Item_Name}
        secondary={
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body2">
            {numberFormat(item.Item_Price?.Price || 0)} Tsh
          </Typography>
        }
      />
      <ListItemText
        primary={
          <Typography
            sx={{
              display: "inline",
              flexGrow: 1,
              textAlign: "right",
              alignItems: "center",
            }}
            component="span"
            variant="p">
            {numberFormat((item.Item_Price?.Price || 0) * item.Quantity)} Tsh
          </Typography>
        }
      />
    </ListItem>
  );
};

export default CheckOutListItems;

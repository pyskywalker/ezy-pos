import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { alpha, Avatar, Button, capitalize, Grid, Stack } from "@mui/material";
import CleanHandsIcon from "@mui/icons-material/CleanHands";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import DevicesIcon from "@mui/icons-material/Devices";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import {
  amber,
  indigo,
  lightGreen,
  orange,
  purple,
  red,
} from "@mui/material/colors";
import { numberFormat } from "../utils/helpers";

const ItemCards = ({ item, onClick, index }) => {
  const categories = {
    "Food and Beverages": {
      icon: <FastfoodIcon sx={{ height: 36, width: 36 }} />,
    },
    Cosmetics: {
      icon: <CleanHandsIcon sx={{ height: 36, width: 36 }} />,
    },
    Stationaries: {
      icon: <LocalPrintshopIcon sx={{ height: 36, width: 36 }} />,
    },
    "Shoes and Clothes": {
      icon: <CheckroomIcon sx={{ height: 36, width: 36 }} />,
    },
    Electronics: {
      icon: <DevicesIcon sx={{ height: 36, width: 36 }} />,
    },
  };
  return (
    <Grid item md={3} sm={6} xs={12}>
      <Card
        component={Button}
        onClick={() => onClick(item)}
        sx={{
          p: 2,
          width: "100%",
          borderTop: "8px solid",
          borderColor: (theme) =>
            index % 2
              ? theme.palette.primary.main
              : theme.palette.secondary.main,
        }}>
        <Stack
          direction="row"
          sx={{
            width: "100%",
          }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}>
          <Avatar
            sx={{
              bgcolor: (theme) =>
                index % 2
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main,
              boxShadow: (theme) =>
                `0 7px 30px ${alpha(
                  index % 2
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
                  0.15
                )}`,
              width: 80,
              height: 80,
              position: "relative",
              "&::before": {
                content: `""`,
                position: "absolute",
                width: "7px",
                height: "76px",
                borderBottomRightRadius: "11px",
                borderTopRightRadius: "6px",
                top: "10%",
                right: "30%",
                backgroundColor: "rgba(255, 255, 255, 0.135)",
                transform: "rotate(35deg)",
              },
              "&::after": {
                content: `""`,
                position: "absolute",
                width: "6px",
                height: "80px",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "3px",
                top: "-4%",
                right: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.135)",
                transform: "rotate(35deg)",
              },
            }}>
            {categories[item.Category_Name]?.icon || (
              <CheckroomIcon sx={{ height: 36, width: 36 }} />
            )}
          </Avatar>
          <Stack alignItems={"end"}>
            <Typography
              fontWeight="bold"
              fontSize="16px"
              textAlign={"right"}
              fullWidth
              width={"100%"}>
              {capitalize(item.Item_Name)}
            </Typography>
            <Typography
              textAlign={"right"}
              fontSize="12px"
              fullWidth
              noWrap
              sx={{ marginBottom: 1 }}
              color={"#7B7B7C"}>
              {item.Category_Name}
            </Typography>
            <Typography textAlign={"right"}>
              {numberFormat(item.Item_Price?.Price || 0)} Tsh
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
};

export default ItemCards;

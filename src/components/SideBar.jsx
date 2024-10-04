import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Person from "@mui/icons-material/Person";
import Dashboard from "@mui/icons-material/Dashboard";
import { blueGrey } from "@mui/material/colors";
import { Logout, Settings } from "@mui/icons-material";
import { Avatar, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4, 2),
  // backgroundImage: "url(/logo.png)",
  // backgroundSize: "contain",
  // backgroundPosition: "center",
  // backgroundRepeat: "no-repeat",

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const SideBar = (props, ref) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (isOpen) => (event) => {
    if (
      event?.type === "keydown" &&
      (event?.key === "Tab" || event?.key === "Shift")
    ) {
      console.log("toggled Drawer");

      return;
    }
    console.log("toggled Drawer");
    setOpen(isOpen);
  };

  useImperativeHandle(ref, () => ({
    openDrawer: (e) => toggleDrawer(true)(e),
  }));

  const [menuOptions] = useState([
    {
      label: "Dashboard",
      name: "1",
      icon: <Dashboard />,
      to: "/private/dashboard",
    },
    {
      label: "Stock Tacking",
      name: "2",
      icon: <InboxIcon />,
      to: "/private/stock-taking",
    },
    {
      label: "Store",
      name: "3",
      icon: <MailIcon />,
      to: "/private/store",
    },
    {
      label: "Employees",
      name: "4",
      icon: <Person />,
      to: "/private/user",
    },
    {
      label: "Setup",
      name: "5",
      icon: <Settings />,
      to: "/private/setup",
    },
  ]);

  return (
    <MuiDrawer
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: blueGrey[50],
        },
      }}>
      <DrawerHeader>
        <Avatar
          alt="logo"
          src="/logo.png"
          sx={{
            "&.MuiAvatar-circular": {
              width: "40px",
              height: "40px",
            },
          }}
        />
      </DrawerHeader>

      <Divider />
      <Box
        role="presentation"
        onClick={(e) => toggleDrawer(false)(e)}
        onKeyDown={(e) => toggleDrawer(false)(e)}>
        <List>
          {menuOptions.map(({ label, name, icon, to }, index) => (
            <ListItem
              key={name}
              sx={{
                "&:hover": {
                  color: (theme) => theme.palette.secondary.main,
                  "& .MuiListItemIcon-root": {
                    color: "inherit",
                  },
                },
              }}>
              <ListItemButton onClick={() => navigate(to)}>
                <ListItemIcon>{icon || <MailIcon />}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

        <List>
          <ListItem
            sx={{
              "&:hover": {
                color: (theme) => theme.palette.secondary.main,
                "& .MuiListItemIcon-root": {
                  color: "inherit",
                },
              },
            }}>
            <ListItemButton
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}>
              <ListItemIcon>{<Logout />}</ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Box>
    </MuiDrawer>
  );
};

export default forwardRef(SideBar);

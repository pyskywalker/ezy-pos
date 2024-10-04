import React from "react";
import MuiAppbar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../images/logo";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserBranch } from "../rtk/BranchSlice";

const Appbar = ({ openSideBar }) => {
  const navigate = useNavigate();
  const userBranch = useSelector(getUserBranch);
  return (
    <MuiAppbar position="sticky" sx={{ marginBottom: 5 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={(e) => openSideBar(e)}
          sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Box
          component="img"
          display="block"
          sx={{ marginRight: 2 }}
          onClick={() => navigate("/private/checkout")}
          height={40}
          width={40}
          mx="auto"
          alt="Logo"
          src={"/logo.png"}
        />
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate("/private/checkout")}>
          Ezy POS
        </Typography>
        {userBranch?.length == 1 ? (
          <Button color="inherit">{window.$branch?.Branch_Name}</Button>
        ) : null}
      </Toolbar>
    </MuiAppbar>
  );
};

export default Appbar;

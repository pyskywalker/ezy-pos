import { Box } from "@mui/material";
import React, { Fragment, useRef } from "react";
import SideBar from "../components/SideBar";
import Appbar from "./Appbar";

const Page = (props) => {
  const sideBarRef = useRef();
  return (
    <Box sx={{ maxHeight: "100vh" }}>
      <SideBar ref={sideBarRef} />
      <Appbar openSideBar={() => sideBarRef.current.openDrawer()} />
      <Box component="main" sx={{ flexGrow: 1, px: 5 }}>
        {props.children}
      </Box>
    </Box>
  );
};

export default Page;

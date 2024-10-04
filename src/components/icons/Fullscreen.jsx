import React from "react";
import { createSvgIcon } from "@mui/material";

const Fullscreen = createSvgIcon(
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <path d="M4 12 L4 4 12 4 M20 4 L28 4 28 12 M4 20 L4 28 12 28 M28 20 L28 28 20 28" />
  </svg>,
  "Fullscreen"
);

export default Fullscreen;

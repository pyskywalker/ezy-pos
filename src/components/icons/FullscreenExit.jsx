import React from "react";
import { createSvgIcon } from "@mui/material";

const FullscreenExit = createSvgIcon(
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
  >
    <path d="M4 12 L12 12 12 4 M20 4 L20 12 28 12 M4 20 L12 20 12 28 M28 20 L20 20 20 28"/>
  </svg>,
  "FullscreenExit"
);

export default FullscreenExit;

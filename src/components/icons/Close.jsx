import React from "react";
import { createSvgIcon } from "@mui/material";

const Close = createSvgIcon(
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="bevel"
      strokeWidth="1.5"
      x1="18.36"
      y1="18.36"
      x2="5.64"
      y2="5.64"
    />
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="bevel"
      strokeWidth="1.5"
      x1="18.36"
      y1="5.64"
      x2="5.64"
      y2="18.36"
    />
  </svg>,
  "Close"
);

export default Close;

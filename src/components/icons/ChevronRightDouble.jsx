import React from "react";
import { createSvgIcon } from "@mui/material";

const ChevronRightDouble = createSvgIcon(
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 21 21"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(7 6)"
    >
      <path d="m.5 8.5 4-4-4-4"/>
      <path d="m4.5 8.5 4-4-4-4"/>
    </g>
  </svg>,
  "ChevronRightDouble"
);

export default ChevronRightDouble;

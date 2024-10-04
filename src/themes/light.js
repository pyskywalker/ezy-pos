import { createTheme } from "@mui/material/styles";
import {
  amber,
  blue,
  blueGrey,
  green,
  lightBlue,
  red,
} from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blueGrey[800],
      contrastText: "#fff",
    },
    secondary: {
      main: "#40ab91",
      contrastText: "#fff",
    },
    tertiary: {
      main: blue[500],
      contrastText: "#fff",
    },
    info: {
      main: lightBlue[600],
      contrastText: "#fff",
    },
    success: {
      main: "#00ba9d",
      contrastText: "#fff",
    },
    warning: {
      main: amber[600],
      contrastText: "#fff",
    },
    error: {
      main: red[600],
      contrastText: "#fff",
    },
    neutral: {
      main: "#808080",
      contrastText: "#fff",
    },
    text: {
      secondary: "rgba(0, 0, 0, 0.58)",
    },
    background: {
      default: blueGrey[50],
      paper: "#fff",
    },
    divider: "#e8e8e8",
  },
  typography: {
    fontFamily: ['"Nunito Sans"', "sans-serif"].join(","),
    fontSize: 12,
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 5,
  },
  components: {
    //   MuiAppBar: {
    //     styleOverrides: {
    //       root: {
    //         backgroundColor: "#fff",
    //       },
    //     },
    //   },
    // MuiDrawer: {
    //   styleOverrides: {
    //     paper: {
    //       boxShadow: "0 8px 24px rgba(229, 228, 230, 0.4)",
    //     },
    //   },
    // },
    MuiToolbar: {
      styleOverrides: {
        regular: {
          height: 72,
          minHeight: 72,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0 4px 16px 0 rgba(169, 184, 200, 0.15)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 16px 0 rgba(169, 184, 200, 0.15)",

          "&.MuiPaper-elevation0": {
            boxShadow: "none",
          },
          "&.MuiPaper-outlined": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          textTransform: "none",
        },
        outlined: {
          textTransform: "none",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#e0e0e0",
          },
          backgroundColor: "white",
          "&:hover:not(.Mui-focused) fieldset": {
            borderColor: "#ddd",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "1px !important",
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root:hover": {
            backgroundColor: "#f5f5f5",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#e8e8e8",
          padding: "8px 12px",
        },
        head: {
          padding: "12px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          verticalAlign: "bottom",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          color: lightBlue[600],
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        rounded: {
          borderRadius: 5,
        },
      },
    },
    // MuiPagination: {
    //   styleOverrides: {
    //     ul: {
    //       border: "1px solid #e8e8e8",
    //       borderRadius: 5,
    //
    //       "& .MuiPaginationItem-root": {
    //         margin: 0,
    //         borderRadius: 0,
    //         borderRight: "1px solid #e8e8e8",
    //       },
    //       "& .MuiPaginationItem-ellipsis": {
    //         height: 32,
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //       },
    //       "& li:first-child .MuiPaginationItem-root": {
    //         borderRadius: "5px 0 0 5px",
    //       },
    //       "& li:last-child .MuiPaginationItem-root": {
    //         borderRadius: "0 5px 5px 0",
    //         borderRight: "none",
    //       },
    //     },
    //   }
    // },
  },
});

export default theme;

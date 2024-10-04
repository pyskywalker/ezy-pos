import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import RequireAuth from "./components/RequireAuth";
import React, { useState, useMemo, useEffect } from "react";
import darkTheme from "./themes/dark";
import lightTheme from "./themes/light";
import LogIn from "./screens/auth/Login";
import Auth from "./components/layouts/Auth";
import CheckOut from "./screens/CheckOut";
import SetupRoutes from "./screens/setup/SetupRoutes";
import { SnackbarProvider, useSnackbar } from "notistack";
import StoreRoutes from "./screens/store/StoreRoutes";
import UserManager from "./screens/setup/UserManager";
import Dashboard from "./screens/Dashboard";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const theme = useMemo(() => {
    return themeMode === "light" ? lightTheme : darkTheme;
  }, [themeMode]);

  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            "*": {
              scrollbarWidth: "thin",
            },

            "*::-webkit-scrollbar": {
              width: 8,
              height: 8,
            },

            "*::-webkit-scrollbar-thumb": {
              borderRadius: 8,
            },
            "*::selection": {
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
            },
            ".MuiTableBody-root > .MuiTableRow-root:last-child > .MuiTableCell-root":
              {
                borderBottom: "none",
              },
          }}
        />
        <Routes>
          <Route path="/" exact element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <Auth>
                <LogIn />
              </Auth>
            }
          />

          <Route
            path="/private"
            element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="checkout" element={<CheckOut />} />
            <Route path="setup/*" element={<SetupRoutes />} />
            <Route
              path="store/*"
              element={<StoreRoutes stockTakingType="Grn" />}
            />
            <Route
              path="stock-taking/*"
              element={<StoreRoutes stockTakingType="Physical Count" />}
            />
            <Route path="user" element={<UserManager />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;

import React, { useState, useMemo } from "react";
import "./index.css";
import "./i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// Material UI imports
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ModalProvider } from "./Context/ModalContext";

// My Components imports
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { myTheme } from "./Theme";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import ErrorSnackbar from "./Components/ErrorSnackBar";
import { useAuthStore } from "./Stores/AuthStore";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function App() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");
  const { i18n } = useTranslation();
  const { user } = useAuthStore();
  useEffect(() => {
    const lang = i18n.language;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const isMobile = useMediaQuery("(max-width: 600px)");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const location = useLocation();

  const theme = useMemo(() => createTheme(myTheme(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <ErrorSnackbar />
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {user !== null || localStorage.getItem("token") ? (
            <>
              <Header
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                setMode={setMode}
              />
              <Sidebar
                open={open}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
                setOpen={setOpen}
              />
            </>
          ) : (
            <></>
          )}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Outlet />
          </Box>
        </Box>
      </ModalProvider>
    </ThemeProvider>
  );
}

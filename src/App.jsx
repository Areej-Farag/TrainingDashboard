import React, { useState, useMemo } from "react";
import "./index.css";
import "./i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ModalProvider } from "./Context/ModalContext";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { myTheme } from "./Theme";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import ErrorSnackbar from "./Components/ErrorSnackBar";
import { useAuthStore } from "./Stores/AuthStore";

const drawerWidth = 210;
const closedDrawerWidth = 65; // Approximate width when sidebar is closed

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function App() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");
  const { i18n } = useTranslation();
  const { user } = useAuthStore();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const location = useLocation();
  const direction = i18n.dir();

  useEffect(() => {
    const lang = i18n.language;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const theme = useMemo(() => createTheme(myTheme(mode)), [mode]);

  // Calculate margin and width for both desktop and mobile
  const mainContentMargin = {
    marginLeft: direction === "ltr" ? (open ? `${drawerWidth}px` : `${closedDrawerWidth}px`) : "0px",
    marginRight: direction === "rtl" ? (open ? `${drawerWidth}px` : `${closedDrawerWidth}px`) : "0px",
    width: `calc(100% - ${open ? drawerWidth : closedDrawerWidth}px)`,
    transition: theme.transitions.create(["margin-left", "margin-right", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };

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
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              ...mainContentMargin,
            }}
          >
            <DrawerHeader />
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </ModalProvider>
    </ThemeProvider>
  );
}
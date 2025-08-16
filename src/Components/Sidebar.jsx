import MuiDrawer from "@mui/material/Drawer";
import { Button, Stack, Typography, Snackbar, Alert } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { styled, useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import { purple } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useAuthStore } from "../Stores/AuthStore";
import { useTranslation } from "react-i18next";

// mui icons import
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import InterestsOutlinedIcon from "@mui/icons-material/InterestsOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";

const drawerWidth = 240;

const menuItems3 = [
  {
    text: "Bar Chart",
    icon: <BarChartOutlinedIcon />,
    path: "/bar",
  },
  {
    text: "Pie Chart",
    icon: <PieChartOutlinedIcon />,
    path: "/pie",
  },
  {
    text: "Line Chart",
    icon: <ShowChartOutlinedIcon />,
    path: "/line",
  },
  {
    text: "Geo Chart",
    icon: <MapOutlinedIcon />,
    path: "/geo",
  },
  {
    text: "Calender",
    icon: <CalendarTodayOutlinedIcon />,
    path: "/calender",
  },
  {
    text: "FAQ page",
    icon: <HelpOutlineOutlinedIcon />,
    path: "/faq",
  },
];

export default function Sidebar({ open, handleDrawerClose, handleDrawerOpen }) {
  const { t, i18n } = useTranslation();
  const { user, logOut, error, getAdminData } = useAuthStore();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const token = localStorage.getItem("token");
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const direction = i18n.dir();

  const menuItems1 = [
    {
      text: t("Dashboard"),
      icon: <HomeOutlinedIcon />,
      path: "/",
    },
    {
      text: t("Admins"),
      icon: <Person2OutlinedIcon />,
      path: "/admins",
    },
    {
      text: t("Users"),
      icon: <GroupOutlinedIcon />,
      path: "/users",
    },
    {
      text: t("Merchants"),
      icon: <StorefrontOutlinedIcon />,
      path: "/merchants",
    },
    {
      text: t("Governments"),
      icon: <GavelOutlinedIcon />,
      path: "/governmental",
    },
  ];
  const menuItems2 = [
    {
      text: t("Messages"),
      icon: <ChatOutlinedIcon />,
      path: "/messages",
    },
    {
      text: t("Interests"),
      icon: <InterestsOutlinedIcon />,
      path: "/interests",
    },
    {
      text: t("Cities"),
      icon: <ListAltOutlinedIcon />,
      path: "/cities",
    },
    {
      text: t("Countries"),
      icon: <LanguageOutlinedIcon />,
      path: "/countries",
    },
  ];

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        },
      },
    ],
  }));

  const handleLogOut = async () => {
    const success = await logOut();
    if (success) {
      setSnackbar({
        open: true,
        message: "Logout successful!",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } else {
      setSnackbar({
        open: true,
        message: error || "Logout failed!",
        severity: "error",
      });
    }
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: direction === "rtl" ? "flex-start" : "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  useEffect(() => {
    if (token) {
      getAdminData();
    }
  }, [token]);

  return (
    <div>
      <Drawer
        sx={{
          position: "fixed",
          zIndex: 100,
          background: theme.palette.primary.main,
          "& .MuiDrawer-paper": {
            background: theme.palette.primary.main,
            direction: direction,
          },
        }}
        variant={!isMobile ? "permanent" : open ? "permanent" : "temporary"}
        anchor={direction === "rtl" ? "right" : "left"}
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ background: "#6A2181" }} />
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ background: theme.palette.primary.main }}
        >
          {token ? (
            <>
              <Avatar
                alt={user?.name}
                src={user?.image_url}
                sx={{
                  cursor: "pointer",
                  width: open ? 56 : 40,
                  height: open ? 56 : 40,
                  my: 1,
                  border: 2,
                  borderColor: "grey",
                  transition: "all ease-in-out 0.3s",
                  "& img": {
                    objectFit: "contain",
                  },
                }}
                onClick={handleDrawerOpen}
              />
              <Typography
                sx={{
                  fontSize: open ? 18 : 0,
                  transition: "all ease-in-out 0.3s",
                  direction: direction,
                  textAlign: "center",
                }}
              >
                {user?.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: open ? 14 : 0,
                  transition: "all ease-in-out 0.3s",
                  direction: direction,
                  textAlign: "center",
                }}
                color="primary"
              >
                {user?.type}
              </Typography>
              {open ? (
                <Button
                  sx={{
                    padding: "5px 10px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#fff",
                    color: theme.palette.primary.main,
                  }}
                  onClick={handleLogOut}
                >
                  {t("Logout")}
                </Button>
              ) : null}
            </>
          ) : open ? (
            <Button
              sx={{
                color: theme.palette.primary.main,
                backgroundColor: "#fff",
                padding: "5px 10px",
                borderRadius: "10px",
                my: "10px",
              }}
              onClick={() => navigate("/login")}
            >
              {t("Login")}
            </Button>
          ) : null}
        </Stack>
        <Divider sx={{ background: "#6A2181" }} />
        <List sx={{ background: theme.palette.primary.main }}>
          {menuItems1.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    bgcolor:
                      location.pathname === item.path
                        ? theme.palette.mode === "dark"
                          ? purple[300]
                          : purple[200]
                        : "",
                    justifyContent: open ? "initial" : "center",
                  },
                ]}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: open ? (direction === "rtl" ? 0 : 3) : "auto",
                    ml: open ? (direction === "rtl" ? 3 : 0) : "auto",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    "& .MuiTypography-root": {
                      direction: direction,
                      textAlign: direction === "rtl" ? "right" : "left",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ background: "#6A2181" }} />
        <List sx={{ background: theme.palette.primary.main }}>
          {menuItems2.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    bgcolor:
                      location.pathname === item.path
                        ? theme.palette.mode === "dark"
                          ? purple[300]
                          : purple[400]
                        : "",
                    justifyContent: open ? "initial" : "center",
                  },
                ]}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: open ? (direction === "rtl" ? 0 : 3) : "auto",
                    ml: open ? (direction === "rtl" ? 3 : 0) : "auto",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    "& .MuiTypography-root": {
                      direction: direction,
                      textAlign: direction === "rtl" ? "right" : "left",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ background: "#6A2181" }} />
        <List sx={{ background: theme.palette.primary.main }}>
          {menuItems3.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    bgcolor:
                      location.pathname === item.path
                        ? theme.palette.mode === "dark"
                          ? purple[300]
                          : purple[400]
                        : "",
                    justifyContent: open ? "initial" : "center",
                  },
                ]}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: open ? (direction === "rtl" ? 0 : 3) : "auto",
                    ml: open ? (direction === "rtl" ? 3 : 0) : "auto",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    "& .MuiTypography-root": {
                      direction: direction,
                      textAlign: direction === "rtl" ? "right" : "left",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          // @ts-ignore
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

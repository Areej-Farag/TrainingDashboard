import MuiDrawer from "@mui/material/Drawer";
import {
  Button,
  ButtonBase,
  Stack,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
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
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { purple } from "@mui/material/colors";

// mui icons  import
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { CloseOutlined } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useUserStore } from "../Stores/AuthStore";

const drawerWidth = 240;
const menuItems1 = [
  {
    text: "Dashboard",
    icon: <HomeOutlinedIcon />,
    path: "/",
  },
  {
    text: "Admins",
    icon: <GroupOutlinedIcon />,
    path: "/admins",
  },
  {
    text: "Users",
    icon: <ContactsOutlinedIcon />,
    path: "/users",
  },
  {
    text: "Invoices Balances",
    icon: <ListAltOutlinedIcon />,
    path: "/invoices",
  },
];

const menuItems2 = [
  {
    text: "Profile Form",
    icon: <Person2OutlinedIcon />,
    path: "/form",
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
];
export default function Sidebar({ open, handleDrawerClose, setOpen }) {
  const { user, logOut, error, getAdminData } = useUserStore();
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
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  useEffect(() => {
    if (token) {
      getAdminData();
      console.log(user);
    }
  }, [token]);
  return (
    <div>
      <Drawer
        sx={{
          position: "fixed",
          zIndex: 100,
          background: theme.palette.primary.main,
        }}
        variant={!isMobile ? "permanent" : open ? "permanent" : "temporary"}
        open={open}
      >
        <DrawerHeader sx={{ background: theme.palette.primary.main }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ background: "#6A2181" }} />
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ background: theme.palette.primary.main }}
        >
          {token ? (
            <>
              <Avatar
                alt={user?.name}
                src={user?.image_url}
                sx={{
                  width: open ? 56 : 40,
                  height: open ? 56 : 40,
                  my: 1,
                  border: 2,
                  borderColor: "grey",
                  transition: "all ease-in-out 1s",
                  "& img": {
                    objectFit: "contain",
                  },
                }}
              />

              <Typography
                sx={{ fontSize: open ? 18 : 0 }}
                style={{ transition: " all ease-in-out 1s" }}
              >
                {user?.name}
              </Typography>
              <Typography
                sx={{ fontSize: open ? 14 : 0 }}
                style={{ transition: " all ease-in-out 1s" }}
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
                  Log Out
                </Button>
              ) : (
                ""
              )}
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
              Login
            </Button>
          ) : (
            ""
          )}
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
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
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
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
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
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
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
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

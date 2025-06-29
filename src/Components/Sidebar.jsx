import MuiDrawer from "@mui/material/Drawer";
import { Stack, Typography } from "@mui/material";
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
import { grey } from "@mui/material/colors";

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

const drawerWidth = 240;

export default function Sidebar({ open, handleDrawerClose, setOpen }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const menuItems1 = [
    {
      text: "Dashboard",
      icon: <HomeOutlinedIcon />,
      path: "/",
    },
    {
      text: "Teams",
      icon: <GroupOutlinedIcon />,
      path: "/teams",
    },
    {
      text: "Contacts Information",
      icon: <ContactsOutlinedIcon />,
      path: "/contacts",
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

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  return (
    <div>
      <Drawer sx={{ position:"fixed"  ,zIndex: 100 }} 
        variant={!isMobile ? "permanent" : open ? "permanent" : "temporary"}
        open={open}
      >
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Avatar
            alt="Remy Sharp"
            src="https://th.bing.com/th/id/OIP.9lp-AzhvWVzYdKMb9E8tLQHaHs?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3"
            sx={{
              width: open ? 56 : 40,
              height: open ? 56 : 40,
              my: 1,
              border: 2,
              borderColor: "grey",
            }}
            style={{ transition: " all ease-in-out 1s" }}
          />
          <Typography
            sx={{ fontSize: open ? 18 : 0 }}
            style={{ transition: " all ease-in-out 1s" }}
          >
            John Doe
          </Typography>
          <Typography
            sx={{ fontSize: open ? 14 : 0 }}
            style={{ transition: " all ease-in-out 1s" }}
            color="primary"
          >
            Admin
          </Typography>
        </Stack>

        <Divider />
        <List>
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
                          ? grey[800]
                          : grey[300]
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
        <Divider />
        <List>
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
                          ? grey[800]
                          : grey[300]
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
        <Divider />
        <List>
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
                          ? grey[800]
                          : grey[300]
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
    </div>
  );
}

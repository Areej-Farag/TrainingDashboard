import React from "react";

// Material UI imports
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import MuiAppBar from "@mui/material/AppBar";
import { styled, alpha, useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/material";
import logo from "../Assests/Images/HayaLogo.jpg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";

// Icons imports
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
function Header({ open, handleDrawerOpen, setMode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{ background: theme.palette.primary.main }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "40px", height: "40px" }}
          />
        </IconButton>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setMode((mode) => (mode === "dark" ? "light" : "dark"));
                    localStorage.setItem(
                      "mode",
                      theme.palette.mode === "dark" ? "light" : "dark"
                    );
                    handleMenuClose();
                  }}
                >
                  {theme.palette.mode === "dark" ? (
                    <WbSunnyOutlinedIcon />
                  ) : (
                    <BedtimeOutlinedIcon />
                  )}
                  &nbsp; Theme
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <NotificationsNoneOutlinedIcon />
                  &nbsp; Notifications
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <SettingsOutlinedIcon />
                  &nbsp; Settings
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <PermIdentityOutlinedIcon />
                  &nbsp; Profile
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Stack direction="row" spacing={1}>
              <IconButton
                color="inherit"
                onClick={() => {
                  setMode((mode) => (mode === "dark" ? "light" : "dark"));
                  localStorage.setItem(
                    "mode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                }}
              >
                {theme.palette.mode === "dark" ? (
                  <BedtimeOutlinedIcon />
                ) : (
                  <WbSunnyOutlinedIcon />
                )}
              </IconButton>
              <IconButton color="inherit">
                <NotificationsNoneOutlinedIcon />
              </IconButton>
              <IconButton color="inherit">
                <SettingsOutlinedIcon />
              </IconButton>
              <IconButton color="inherit">
                <PermIdentityOutlinedIcon />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(Header);

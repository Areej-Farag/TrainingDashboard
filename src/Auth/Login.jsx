import {
  Stack,
  Typography,
  TextField,
  useTheme,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import React from "react";
// @ts-ignore
import Logo from "../Assests/Images/HayaLogo.jpg";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Stores/AuthStore";
import { useTranslation } from "react-i18next";

export default function LogIn() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { LogIn, error } = useAuthStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleLogin = async () => {
    const success = await LogIn(email, password);

    if (success) {
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setSnackbar({
        open: true,
        message: error || "Login failed!",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Stack sx={{ width: "100%", minHeight: "110vh" }}>
        <Stack
          direction={{ md: "row", xs: "column" }}
          sx={{
            width: { md: "90%", xs: "100%" },
            height: { md: "600px", xs: "100%" },
            mx: "auto",
            borderRadius: "10px",
            backgroundColor: theme.palette.background.default,
            p: 2,
            boxShadow: 2,
            gap: "20px",
          }}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack
            sx={{
              width: { md: "50%", xs: "70%" },
              height: { md: "100%", xs: "50%" },
              mt: { md: "0px", xs: "20px" },
            }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "100%", height: "100%" }}
            />
          </Stack>
          <Stack sx={{ width: { md: "40%", xs: "100%" }, gap: "20px" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: "20px",
                color: theme.palette.secondary.main,
                textAlign: "center",
              }}
            >
              {t("LogIn")}
            </Typography>
            <TextField
              label={t("Email")}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label={t("Password")}
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Stack
              direction={"column"}
              sx={{ gap: "10px" }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {/* <Typography variant="body1" sx={{ textAlign: "center" }}>
                {t("DontHaveAccount")}?
              </Typography>
              <Link
                to={"/signup"}
                style={{
                  textAlign: "center",
                  color: theme.palette.secondary.main,
                  textDecoration: "none",
                }}
              >
                SignUp
              </Link> */}

              <Button
                variant="contained"
                color="secondary"
                sx={{ width: "60px", height: "40px" }}
                onClick={handleLogin}
              >
                {t("LogIn")}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

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
    </>
  );
}

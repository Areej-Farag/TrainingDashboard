import {
  Stack,
  Typography,
  TextField,
  useTheme,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
// @ts-ignore
import Logo from "../Assests/Images/HayaLogo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Stores/AuthStore";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

export default function LogIn() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { LogIn, error } = useAuthStore();
  const navigate = useNavigate();
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const success = await LogIn(data.email, data.password);

      if (success) {
        setSnackbar({
          open: true,
          message: t("Login successful!"),
          severity: "success",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setSnackbar({
          open: true,
          message: error || t("Login failed!"),
          severity: "error",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: t("An error occurred during login"),
        severity: "error",
      });
    }
  };

  return (
    <>
      <Stack sx={{ width: "100%", minHeight: "100vh" }}>
        <Stack
          direction={{ md: "row", xs: "column" }}
          sx={{
            width: { md: "90%", xs: "100%" },
            height: { md: "600px", xs: "auto" },
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
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  width: "100%",
                  mb: "20px",
                }}
                {...register("email", {
                  required: t("Email is required"),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t("Invalid email address"),
                  },
                })}
                placeholder={t("Email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                onChange={(e) => {
                  register("email").onChange(e);
                }}
              />
              <TextField
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  width: "100%",
                  mb: "20px",
                }}
                {...register("password", {
                  required: t("Password is required"),
                  minLength: {
                    value: 6,
                    message: t("Password must be at least 6 characters"),
                  },
                })}
                placeholder={t("Password")}
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                onChange={(e) => {
                  register("password").onChange(e);
                }}
              />
              <Stack
                direction={"column"}
                sx={{ gap: "10px" }}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  {t("DontHaveAccount")}?
                </Typography>
                <Link
                  to="/signup"
                  style={{
                    textAlign: "center",
                    color: theme.palette.secondary.main,
                    textDecoration: "none",
                  }}
                >
                  {t("SignUp")}
                </Link>
                <Button
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  sx={{ width: "100px", height: "40px", borderWidth: "3px" }}
                >
                  {t("LogIn")}
                </Button>
              </Stack>
            </form>
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
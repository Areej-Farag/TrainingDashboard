// @ts-nocheck
import {
  Stack,
  Typography,
  Button,
  TextField,
  useTheme,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAdminStore } from "../../Stores/AdminStore";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AdminPageForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const action = id ? "Edit Admin" : "Add Admin";
  const { admins, AddAdmin, UpdateAdmin } = useAdminStore();
  const [user, setUser] = useState(null);
  const { t } = useTranslation();
  const featureOptions = [
    { id: 1, value: t("features.privateChat") },
    { id: 2, value: t("features.publicChat") },
    { id: 3, value: t("features.shortVideo") },
    { id: 4, value: t("features.ads") },
    { id: 5, value: t("features.deals") },
    { id: 6, value: t("features.delivery") },
  ];
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const theme = useTheme();

  useEffect(() => {
    if (id && admins?.length > 0) {
      const found = admins.find((admin) => admin.id === Number(id));
      if (found) {
        setUser(found);
      }
    }
  }, [id, admins]);

  useEffect(() => {
    if (action === "Edit Admin" && user) {
      setValue("id", user.id || "");
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setValue("type", featureOptions.find((option) => option.id == user.type).value || "");
    }
  }, [user, action]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.password) {
      formData.append("password", data.password);
    }
    formData.append("type", data.type);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      if (action === "Add Admin") {
        await AddAdmin(formData);
      } else if (action === "Edit Admin" && user?.id) {
        await UpdateAdmin(user.id, formData);
      }

      console.log("Form submitted:", data);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
    navigate("/admins");
  };

  return (
    <Stack
      gap={2}
      p={2}
      sx={{
        margin: "auto",
        width: "90%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>
        {action === "Add Admin" ? `${t("Add Admin")} ` : `${t("Edit Admin")}`}
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        style={{ width: "100%" }}
      >
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Stack direction={"column"} spacing={2} sx={{ width: "100%" }}>
            <TextField
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                width: "100%",
              }}
              {...register("name", {
                required: ` ${t("Name")} ${t("is required")}`,
              })}
              placeholder={t("Name")}
              label={t("Name")}
              error={!!errors.name}
              // @ts-ignore
              helperText={errors.name?.message}
            />
            <TextField
              label={t("Email")}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                width: "100%",
              }}
              {...register("email", {
                required: ` ${t("Email")} ${t("is required")} `,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: `${t("Invalid")} ${t("email")} }`,
                },
              })}
              placeholder={t("Email")}
              error={!!errors.email}
              // @ts-ignore
              helperText={errors.email?.message}
            />
            <TextField
              label={t("Phone")}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                width: "100%",
              }}
              {...register("phone", {
                required: ` ${t("Phone")} ${t("is required")}`,
              })}
              placeholder={t("Phone")}
              error={!!errors.phone}
              // @ts-ignore
              helperText={errors.phone?.message}
            />
            {action === "Add Admin" && (
              <TextField
                label={t("Password")}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  width: "100%",
                }}
                {...register("password", {
                  required:
                    action === "Add Admin"
                      ? ` ${t("Password")} ${t("is required")}`
                      : false,
                })}
                placeholder={t("Password")}
                type="password"
                error={!!errors.password}
                // @ts-ignore
                helperText={errors.password?.message}
              />
            )}
          </Stack>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="image">{t("Admin Image")}</label>
            <input type="file" {...register("image")} />
          </Box>
          <Box>
            <label htmlFor="Admin Type" style={{ direction: "ltr" }}>
              {t("Admin Type")}
            </label>
            <select
              style={{
                height: "40px",
                borderRadius: "5px",
                border: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
                width: "100%",
                backgroundColor: theme.palette.background.default,
              }}
              {...register("type", { required: "Type is required" })}
              // @ts-ignore
              error={!!errors.type}
            >
              {featureOptions.map((option) => (
                <option key={option.value} value={option.value} style={{color: theme.palette.text.primary}}>
                  {option.value}
                </option>
              ))}
            </select>
            {errors.type && (
              <Typography color="error" variant="caption">
                {errors.type.message}
              </Typography>
            )}
          </Box>
          <Button variant="contained" color="primary" type="submit">
            {action === "Add Admin" ? `${t("Add")}` : ` ${t("Edit")}`}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

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

export default function AdminPageForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const action = id ? "Edit Admin" : "Add Admin";
  const { admins, AddAdmin, UpdateAdmin } = useAdminStore();
  const [user, setUser] = useState(null);

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
      setValue("type", user.type || "");
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
      <Typography variant="h4" sx={{color: theme.palette.primary.main}}>{action}</Typography>
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
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              label="Name"
              error={!!errors.name}
              // @ts-ignore
              helperText={errors.name?.message}
            />
            <TextField
              label="Email"
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                width: "100%",
              }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email"
              error={!!errors.email}
              // @ts-ignore
              helperText={errors.email?.message}
            />
            <TextField
              label="Phone"
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                width: "100%",
              }}
              {...register("phone", { required: "Phone is required" })}
              placeholder="Phone"
              error={!!errors.phone}
              // @ts-ignore
              helperText={errors.phone?.message}
            />
        {action === "Add Admin" &&    <TextField
              label="Password"
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                width: "100%",
              }}
              {...register("password", {
                required:
                  action === "Add Admin" ? "Password is required" : false,
              })}
              placeholder="Password"
              type="password"
              error={!!errors.password}
              // @ts-ignore
              helperText={errors.password?.message}
            />}
          </Stack>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="image">Admin Image</label>
            <input type="file" {...register("image")} />
          </Box>
          <Box>
            <label htmlFor="Admin Type">Admin Type</label>
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
              <option value="">Select Type</option>
              <option value="1">Male</option>
              <option value="2">Other</option>
              <option value="3">Admin</option>
              <option value="4">User</option>
              <option value="5">Super Admin</option>
              <option value="6">Super User</option>
            </select>
            {errors.type && (
              <Typography color="error" variant="caption">
                {errors.type.message}
              </Typography>
            )}
          </Box>
          <Button variant="contained" color="primary" type="submit">
            {action === "Add Admin" ? "Add" : "Update"}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

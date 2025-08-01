import {
  Stack,
  Typography,
  Button,
  TextField,
  useTheme,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useAdminStore } from "../../Stores/AdminStore";

export default function AdminPageForm({
  action = "Add Admin",
  user = {},
  setOpen,
}) {
  const { AddAdmin, UpdateAdmin } = useAdminStore();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const theme = useTheme();

  useEffect(() => {
    if (action === "Edit Admin" && user) {
      setValue("image", user.image || "");
      setValue("id", user.id || "");
      setValue("name", user.name || "");
      setValue("email", user.Email || "");
      setValue("phone", user.Phone || "");
      setValue("type", user.Type || "");
      console.log("user from edit:", user);
    }


  }, [user, action, setValue]);

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
      } else if (action === "Edit Admin" && user.id) {
        await UpdateAdmin(user.id, formData);
      }
      console.log("Form submitted:", data);
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <Stack
      gap={2}
      p={2}
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <CloseIcon
        onClick={() => setOpen(false)}
        sx={{ position: "absolute", top: 0, right: 0, cursor: "pointer", color: "red" }}
      />
      <Typography variant="h6">{action}</Typography>
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
              helperText={errors.phone?.message}
            />
            <TextField
              label="Password"
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                width: "100%",
              }}
              {...register("password", {
                required: action === "Add Admin" ? "Password is required" : false,
              })}
              placeholder="Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
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
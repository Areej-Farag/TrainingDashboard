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
import { useParams, useNavigate } from "react-router-dom";
import { useCitiesStore } from "../../Stores/CitiesStore";
import { useCountriesStore } from "../../Stores/CountriesStore";
import { useUserStore } from "../../Stores/UserStore";
import { useTranslation } from "react-i18next";

export default function UserPageForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const action = id ? "Edit User" : "Add User";
  const {users} = useUserStore();
  const [user, setUser] = useState(null);
  const { getCities, cities } = useCitiesStore();
  const { countries, getCountries } = useCountriesStore();
  const {t} = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const theme = useTheme();

  useEffect(() => {
    if (id && users?.length > 0) {
      const found = users.find((admin) => admin.id === Number(id));
      if (found) {
        setUser(found);
      }
    }
  }, [id, users]);

  useEffect(() => {
    getCities();
    getCountries();
  }, []);

  useEffect(() => {
    if (action === "Edit User" && user) {
      setValue("id", user.id || "");
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setValue("type", user.type || "");
      setValue("gender", user.gender || "");
      setValue("birth_date", user.birth_date || "");
      setValue("age", user.age || "");
      setValue("country_id", user.country_id || "");
      setValue("city_id", user.city_id || "");
      setValue("activity", user.activity || "");
      setValue("interests", user.interests || "");
      setValue("image", user.image || "");
    }
  }, [user, action]);
  function calculateAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;   }

  return age;
}


  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("type", data.type);
    formData.append("gender", data.gender);
    formData.append("birth_date", data.birth_date);
    formData.append("age", calculateAge(data.birth_date));
    formData.append("country_id", data.country_id);
    formData.append("city_id", data.city_id);
    formData.append("activity", data.activity);
    formData.append("interests", data.interests);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      if (action === "Add User") {
        // await AddAdmin(formData);
      } else if (action === "Edit User" && user?.id) {
        // await UpdateAdmin(user.id, formData);
      }

      console.log("Form submitted:", data);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
    navigate("/users");
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
        {action==="Add User"?t("Add User"):t("Edit User")}
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        style={{ width: "100%" }}
      >
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Stack
            direction={{ lg: "row", xs: "column" }}
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "50%", xs: "100%" },
              }}
            >
              <label htmlFor="birth_date"> {t("Name")}</label>
              <TextField
                sx={{
                  // border: `1px solid ${theme.palette.divider}`,
                  width: "100%",
                }}
                {...register("name", { required: "Name is required" })}
                placeholder={t("Name")}
                
                error={!!errors.name}
                // @ts-ignore
                helperText={errors.name?.message}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "50%", xs: "100%" },
              }}
            >
              <label htmlFor="birth_date"> {t("Email")}</label>
              <TextField
                
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
                placeholder={t("Email")}
                error={!!errors.email}
                // @ts-ignore
                helperText={errors.email?.message}
              />
            </Box>
          </Stack>
          <Stack
            direction={{ lg: "row", xs: "column" }}
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "50%", xs: "100%" },
              }}
            >
              <label htmlFor="birth_date"> {t("Phone")}</label>
              <TextField
                
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  width:  "100%" ,
                }}
                {...register("phone", { required: "Phone is required" })}
                placeholder={t("Phone")}
                error={!!errors.phone}
                // @ts-ignore
                helperText={errors.phone?.message}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "50%", xs: "100%" },
              }}
            >
              <label htmlFor="birth_date">{t("Birth Date")}</label>
              <TextField
                type="date"
                sx={{
                  width: "100%",
                }}
                {...register("birth_date", {
                  required: "Birth Date is required",
                })}
                error={!!errors.birth_date}
                // @ts-ignore
                helperText={errors.birth_date?.message}
              />
            </Box>
          </Stack>
          <Stack direction={"row"} spacing={2} sx={{ width: "100%" }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <label htmlFor="City">{t("City")}</label>
              <select
                style={{
                  height: "40px",
                  borderRadius: "5px",
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                  width: "100%",
                  backgroundColor: theme.palette.background.default,
                }}
                {...register("city_id", { required: "City is required" })}
                // @ts-ignore
                error={!!errors.type}
              >
                {cities?.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.type && (
                <Typography color="error" variant="caption">
                  {errors.type.message}
                </Typography>
              )}
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <label htmlFor="Country">{t("Country")}</label>
              <select
                style={{
                  height: "40px",
                  borderRadius: "5px",
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                  width: "100%",
                  backgroundColor: theme.palette.background.default,
                }}
                {...register("country_id", { required: "Country is required" })}
                // @ts-ignore
                error={!!errors.type}
              >
                {countries?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.type && (
                <Typography color="error" variant="caption">
                  {errors.type.message}
                </Typography>
              )}
            </Box>
          </Stack>
          <Stack direction={"row"} spacing={2} sx={{ width: "100%" }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <label htmlFor="Admin Type">{t("Gender")}</label>
              <select
                style={{
                  height: "40px",
                  borderRadius: "5px",
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                  width: "100%",
                  backgroundColor: theme.palette.background.default,
                }}
                {...register("gender", { required: "Gender is required" })}
                // @ts-ignore
                error={!!errors.type}
              >
                <option value="" disabled>
                  {t("Select Gender")}
                </option>
                <option value="1">{t("Male")}</option>
                <option value="2">{t("Female")}</option>
              </select>
              {errors.type && (
                <Typography color="error" variant="caption">
                  {errors.type.message}
                </Typography>
              )}
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <label htmlFor="Admin Type">User Type</label>
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
                <option value="" disabled>
                  Select Type
                </option>
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
          </Stack>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="image">{t("User Image")}</label>
            <input type="file" {...register("image")} />
          </Box>

          <Button variant="contained" color="primary" type="submit">
            {action === "Add User" ?` ${t("Add")}` : `${t("Edit")}`}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

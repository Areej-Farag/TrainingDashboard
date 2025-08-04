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
import { useCountriesStore } from "../../Stores/CountriesStore";
import { useCitiesStore } from "../../Stores/CitiesStore";
import { useTranslation } from "react-i18next";

export default function CitiesAndCountriesPageForm({
  fromWhere,
  action,
  city = {},
  country = {},
  setOpen,
}) {
  const {t} = useTranslation();

  const { editCountry, addCountry, getCountries, countries } =
    useCountriesStore();
  const { editCity, addCity } = useCitiesStore();
  const language = localStorage.getItem("lang");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const theme = useTheme();

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (action === "Edit City" && city) {
      setValue("id", city.id || "");
      setValue("name_ar", city.name_ar || "");
      setValue("country_id", city.country_id || "");
      setValue("name_en", city.name_en || "");
      console.log("city from edit:", city);
    } else if (action === "Edit Country" && country) {
      setValue("id", country.id || "");
      setValue("name_ar", country.name_ar || "");
      setValue("name_en", country.name_en || "");
      console.log("country from edit:", country);
    }
  }, [city, country, action, setValue]);
  const onSubmit = async (data) => {
    const formData = new FormData();
    if (fromWhere === "cities") {
      formData.append("id", data.id);
      formData.append("name_ar", data.name_ar);
      formData.append("name_en", data.name_en);
      formData.append("country_id", data.country_id);
    } else if (fromWhere === "countries") {
      formData.append("id", data.id);
      formData.append("name_ar", data.name_ar);
      formData.append("name_en", data.name_en);
    }
    try {
      if (action === "Add City") {
        await addCity(formData);
      } else if (action === "Edit City" && city?.id) {
        await editCity(formData);
      }

      if (action === "Add Country") {
        await addCountry(formData);
      } else if (action === "Edit Country" && country?.id) {
        await editCountry(formData);
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
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          cursor: "pointer",
          color: "red",
        }}
      />
      <Typography variant="h6">
        {action === "Add City" ? `${t("Add City")}` : `${t("Edit City")}`}
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
              {...register("name_ar", {
                required: "Name in Arabic is required",
                pattern: {
                  value: /^[ا-ي\s]+$/i,
                  message: `${t("Invalid name in Arabic")}`,
                },
              })}
              placeholder={t("Name in Arabic")}
              label={t("Name in Arabic")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label={t("Name in English")}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                width: "100%",
              }}
              {...register("name_en", {
                required: `${t("Name in English is required")}`,
                pattern: {
                  value: /^[A-Za-z\s]+$/i, // Allow only letters/,
                  message: "Invalid name in English",
                },
              })}
              placeholder={t("Name in English")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Stack>
          {fromWhere === "cities" && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="Admin Type">{t("Select Country")}</label>
              <select
                style={{
                  height: "40px",
                  borderRadius: "5px",
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                  width: "100%",
                  backgroundColor: theme.palette.background.default,
                }}
                {...register("country_id", { required: "country is required" })}
                error={!!errors.type}
              >
                {countries?.map((country) => (
                  <option
                    style={{ color: theme.palette.text.primary }}
                    key={country.id}
                    value={country.id}
                  >
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
          )}
          <Button variant="contained" color="primary" type="submit">
            {action === "Add City" || action === "Add Country"
              ? `${t("Add")}`
              : ` ${t("Edit")}`}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

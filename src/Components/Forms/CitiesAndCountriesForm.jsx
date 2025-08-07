import {
  Stack,
  Typography,
  Button,
  TextField,
  useTheme,
  Box,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useCountriesStore } from "../../Stores/CountriesStore";
import { useCitiesStore } from "../../Stores/CitiesStore";
import { useTranslation } from "react-i18next";

export default function CitiesAndCountriesPageForm({
  fromWhere,
  action,
  PropCity = {},
  PropCountry = {},
  setOpen,
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    editCountry,
    addCountry,
    getCountries,
    countries,
    country,
    showCountry,
    clearCountry,
  } = useCountriesStore();
  const { editCity, addCity, city, showCity, clearCity } = useCitiesStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      name_ar: "",
      name_en: "",
      country_id: "",
    },
  });

  // Fetch countries and city/country data for editing
  useEffect(() => {
    setLoading(true);
    getCountries().finally(() => setLoading(false));

    if (action === "Edit City" && PropCity?.id) {
      setLoading(true);
      showCity(PropCity.id).finally(() => setLoading(false));
    } else if (action === "Edit Country" && PropCountry?.id) {
      setLoading(true);
      showCountry(PropCountry.id).finally(() => setLoading(false));
    }
  }, [
    action,
    PropCity?.id,
    PropCountry?.id,
    getCountries,
    showCity,
    showCountry,
  ]);

  // Populate form when city or country data is available
  useEffect(() => {
    if (action === "Edit City" && city?.id && city.id === PropCity?.id) {
      setValue("id", city.id);
      setValue("name_ar", city.name_ar || "");
      setValue("name_en", city.name_en || "");
      setValue("country_id", city.country_id || "");
      console.log("Populated city from store:", city);
    } else if (
      action === "Edit Country" &&
      country?.id &&
      country.id === PropCountry?.id
    ) {
      setValue("id", country.id);
      setValue("name_ar", country.name_ar || "");
      setValue("name_en", country.name_en || "");
      console.log("Populated country from store:", country);
    }
  }, [action, city, country, PropCity?.id, PropCountry?.id, setValue]);

  const onSubmit = async (data) => {
    if (loading) return;
    const formData = new FormData();
    if (fromWhere === "cities") {
      if (action === "Edit City") formData.append("id", data.id || "");
      formData.append("name_ar", data.name_ar);
      formData.append("name_en", data.name_en);
      formData.append("country_id", data.country_id);
    } else if (fromWhere === "countries") {
      if (action === "Edit Country") formData.append("id", data.id || "");
      formData.append("name_ar", data.name_ar);
      formData.append("name_en", data.name_en);
    }

    try {
      setLoading(true);
      if (action === "Add City") {
        await addCity(formData);
      } else if (action === "Edit City" && data.id) {
        await editCity(formData);
      } else if (action === "Add Country") {
        await addCountry(formData);
      } else if (action === "Edit Country" && data.id) {
        await editCountry(formData);
      }
      console.log("Form submitted:", data);
      setOpen(false);
      reset();
      clearCity(); // Clear store state to prevent stale data
      clearCountry();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
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
        onClick={() => {
          clearCity();
          clearCountry();
          setOpen(false);
        }}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          cursor: "pointer",
          color: "red",
        }}
      />
      <Typography variant="h6">
        {action === "Add City"
          ? t("Add City")
          : action === "Edit City"
          ? t("Edit City")
          : action === "Add Country"
          ? t("Add Country")
          : action === "Edit Country"
          ? t("Edit Country")
          : ""}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          style={{ width: "100%" }}
        >
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
              <TextField
                sx={{ width: "100%" }}
                {...register("name_ar", {
                  required: t("Name in Arabic is required"),
                  pattern: {
                    value: /^[ا-ي\s]+$/i,
                    message: t("Invalid name in Arabic"),
                  },
                })}
                placeholder={t("Name in Arabic")}
                label={t("Name in Arabic")}
                error={!!errors.name_ar}
                helperText={errors.name_ar?.message}
              />
              <TextField
                label={t("Name in English")}
                sx={{ width: "100%" }}
                {...register("name_en", {
                  required: t("Name in English is required"),
                  pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: t("Invalid name in English"),
                  },
                })}
                placeholder={t("Name in English")}
                error={!!errors.name_en}
                helperText={errors.name_en?.message}
              />
              {fromWhere === "cities" && (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="country_id">{t("Select Country")}</label>
                  <select
                    style={{
                      height: "40px",
                      borderRadius: "5px",
                      color: theme.palette.text.primary,
                      width: "100%",
                      backgroundColor: theme.palette.background.default,
                    }}
                    {...register("country_id", {
                      required: t("Country is required"),
                    })}
                  >
                    <option value="">{t("Select a country")}</option>
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
                  {errors.country_id && (
                    <Typography color="error" variant="caption">
                      {errors.country_id.message}
                    </Typography>
                  )}
                </Box>
              )}
            </Stack>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {action === "Add City" || action === "Add Country"
                ? t("Add")
                : t("Edit")}
            </Button>
          </Stack>
        </form>
      )}
    </Stack>
  );
}

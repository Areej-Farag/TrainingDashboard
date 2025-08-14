import React, { useEffect, useMemo } from "react";
import {
  CircularProgress,
  Stack,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import useSettingsStore from "../Stores/SettingsStore";
import PolicyEditor from "../Components/PolicyEditor";
import { useForm } from "react-hook-form";
import { Divider } from "antd";
import isEqual from "lodash/isEqual"; // For deep equality comparison

export default function Settings() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { getSettings, loading, settings, updateSettings } = useSettingsStore();
  const language = localStorage.getItem("i18nextLng");
  const currentSettings = useMemo(() => settings?.[0] || {}, [settings]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      terms_and_conditions_ar: "",
      terms_and_conditions_en: "",
      privacy_policy_ar: "",
      privacy_policy_en: "",
      about_us_ar: "",
      about_us_en: "",
    },
  });

  // Fetch settings on mount or when language changes
  useEffect(() => {
    getSettings();
  }, [language, getSettings]);

  // Reset form values when settings are loaded/updated
  useEffect(() => {
    if (currentSettings && Object.keys(currentSettings).length > 0) {
      const newValues = {
        terms_and_conditions_ar: currentSettings.terms_and_conditions_ar || "",
        terms_and_conditions_en: currentSettings.terms_and_conditions_en || "",
        privacy_policy_ar: currentSettings.privacy_policy_ar || "",
        privacy_policy_en: currentSettings.privacy_policy_en || "",
        about_us_ar: currentSettings.about_us_ar || "",
        about_us_en: currentSettings.about_us_en || "",
      };
      // Only reset if the values have changed
      reset((prev) => (isEqual(prev, newValues) ? prev : newValues));
    }
  }, [currentSettings, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await updateSettings({ ...currentSettings, ...data });
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <Stack sx={{ width: "100%", height: "100vh", alignItems: "center" }}>
      <Typography variant="h2" sx={{ mt: 5 , color: theme.palette.secondary.main }}>
        {t("settings")}
      </Typography>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Stack
            sx={{
              width: "90%",
              height: "100vh",
              alignItems: "center",
              margin: "auto",
              mt: 5,
            }}
            spacing={5}
            direction="column"
          >
            <Typography variant="h3" >{t("terms_and_conditions")}</Typography>
            <Stack
              direction={{ md: "row", xs: "column" }}
              justifyContent="space-between"
              spacing={3}
              sx={{ width: "100%", direction: i18n.dir(), p: 3 }}
            >
              <Box sx={{ width: { md: "48%", xs: "100%" } }}>
                <PolicyEditor
                  control={control}
                  name="terms_and_conditions_ar"
                  label={t("terms_and_conditions_ar")}
                  error={errors.terms_and_conditions_ar}
                />
              </Box>
              <Box sx={{ width: { md: "48%", xs: "100%" } }}>
                <PolicyEditor
                  control={control}
                  name="terms_and_conditions_en"
                  label={t("terms_and_conditions_en")}
                  error={errors.terms_and_conditions_en}
                />
              </Box>
            </Stack>
            <Divider orientation="horizontal" style={{ width: "100%" }} />

            <Typography variant="h3">{t("privacy_policy")}</Typography>
            <Stack
              direction={{ md: "row", xs: "column" }}
              justifyContent="space-between"
              spacing={3}
              sx={{ width: "100%", direction: i18n.dir(), p: 3 }}
            >
              <Box sx={{ width: { md: "48%", xs: "100%" } }}>
                <PolicyEditor
                  control={control}
                  name="privacy_policy_ar"
                  label={t("privacy_policy_ar")}
                  error={errors.privacy_policy_ar}
                />
              </Box>
              <Box sx={{ width: { md: "48%", xs: "100%" } }}>
                <PolicyEditor
                  control={control}
                  name="privacy_policy_en"
                  label={t("privacy_policy_en")}
                  error={errors.privacy_policy_en}
                />
              </Box>
            </Stack>
            <Divider orientation="horizontal" style={{ width: "100%" }} />
            <Typography variant="h3">{t("about_us")}</Typography>
            <Stack
              direction={{ md: "row", xs: "column" }}
              justifyContent="space-between"
              spacing={3}
              sx={{ width: "100%", direction: i18n.dir(), p: 3 }}
            >
              <Box sx={{ width: { md: "48%", xs: "100%" } }}>
                <PolicyEditor
                  control={control}
                  name="about_us_ar"
                  label={t("about_us_ar")}
                  error={errors.about_us_ar}
                />
              </Box>
              <Box sx={{ width: { md: "48%", xs: "100%" } }}>
                <PolicyEditor
                  control={control}
                  name="about_us_en"
                  label={t("about_us_en")}
                  error={errors.about_us_en}
                />
              </Box>
            </Stack>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ my: 5 }}
            >
              {t("Save")}
            </Button>
          </Stack>
        </form>
      )}
    </Stack>
  );
}

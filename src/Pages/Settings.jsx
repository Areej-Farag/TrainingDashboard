import { CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useSettingsStore from "../Stores/SettingsStore";
import TermsAndPrivacy from "../Components/TermsAndPrivacy";
export default function Settings() {
  const { t } = useTranslation();
  const { terms, privacy, loading, getTerms, getPrivacy } = useSettingsStore();
    const language = localStorage.getItem("i18nextLng");
  useEffect(() => {
    getTerms();
    getPrivacy();
  }, [language]);
  return (
    <Stack sx={{ width: "100%", height: "100vh", alignItems: "center" }}>
      <Typography variant="h2" >{t("settings")}</Typography>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Stack
          sx={{
            width: "90%",
            height: "100vh",
            alignItems: "center",
            margin: "auto",
            mt: 5,
          }}
          spacing={5}
          direction={"column"}
        >
          <Stack
            sx={{
              width: { md: "50%", xs: "100%" },
              height: "100vh",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">{t("terms and conditions")}</Typography>
            <TermsAndPrivacy response={terms} />
          </Stack>
          <Stack
            sx={{
              width: { md: "50%", xs: "100%" },
              height: "100vh",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">{t("privacy policy")}</Typography>

            <TermsAndPrivacy response={privacy} />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

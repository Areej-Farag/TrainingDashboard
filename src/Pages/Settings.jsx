import React, { useEffect } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useSettingsStore from "../Stores/SettingsStore";
import TermsEditor from "../Components/TermsEditor";
import PrivacyEditor from "../Components/PrivacyEditor";

export default function Settings() {
  const { t } = useTranslation();
  const {
    terms,
    privacy,
    loading,
    getTerms,
    getPrivacy,
    saveTerms,
    savePrivacy,
  } = useSettingsStore();
  const language = localStorage.getItem("i18nextLng");

  useEffect(() => {
    getTerms();
    getPrivacy();
  }, [language]);

  const handleTermsSave = (content) => {
    console.log(content);
    // saveTerms(content);
  };

  const handlePrivacySave = (content) => {
    console.log(content);

    // savePrivacy(content);
  };

  return (
    <Stack sx={{ width: "100%", height: "100vh", alignItems: "center" }}>
      <Typography variant="h2">{t("settings")}</Typography>
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
          direction="column"
        >
          <TermsEditor initialContent={terms} onSave={handleTermsSave} />
          <PrivacyEditor initialContent={privacy} onSave={handlePrivacySave} />
        </Stack>
      )}
    </Stack>
  );
}

import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

const PrivacyEditor = ({ onSave }) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { privacy: "" }, // Initial value set to empty string
  });

  useEffect(() => {
    setValue("privacy", ""); // Ensure initial content is empty
  }, [setValue]);

  const onSubmit = (data) => {
    onSave(data.privacy); // Save as raw HTML content
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h3">{t("privacy")}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ReactQuill
          value={""} // Initial value set to empty string
          onChange={(value) => setValue("privacy", value)}
          style={{ height: "200px" }}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              [{ list: "bullet" }],
            ],
          }}
          placeholder="Start typing privacy here..."
        />
        <Box
          sx={{ fontSize: "14px", color: "#6B7280", textAlign: "right", my: 2 }}
        >
          {"".replace(/<[^>]+>/g, "").length || 0} / 1000
        </Box>
        {errors.privacy && (
          <Typography color="error" variant="body2" mt={1}>
            {errors.privacy.message}
          </Typography>
        )}
        <Button type="submit" variant="contained" style={{ marginTop: "10px" }}>
          Save Privacy
        </Button>
      </form>
    </Box>
  );
};

export default PrivacyEditor;

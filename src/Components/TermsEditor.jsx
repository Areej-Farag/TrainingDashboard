import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

const TermsEditor = ({ onSave }) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { terms: "" }, 
  });

  useEffect(() => {
    setValue("terms", ""); 
    
  }, [setValue]);

  const onSubmit = (data) => {
    onSave(data.terms); 
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h3">{t("terms")}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ReactQuill
          value={""} 
          onChange={(value) => setValue("terms", value)}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              [{ list: "bullet" }],
            ],
          }}
          style={{ height: "200px" }}
          placeholder="Start typing terms here..."
        />
        <Box
          sx={{ fontSize: "14px", color: "#6B7280", textAlign: "right", my: 2 }}
        >
          {"".replace(/<[^>]+>/g, "").length || 0} / 1000
        </Box>
        {errors.terms && (
          <Typography color="error" variant="body2" mt={1}>
            {errors.terms.message}
          </Typography>
        )}
        <Button type="submit" variant="contained" style={{ marginTop: "10px" }}>
          Save Terms
        </Button>
      </form>
    </Box>
  );
};

export default TermsEditor;

import React from "react";
import { Box, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTranslation } from "react-i18next";

const PolicyEditor = ({ control, name, label, error }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ width: "100%",margin: "20px 0" }}>
      <Typography variant="h5">{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactQuill
            {...field}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                [{ list: "bullet" }],
              ],
            }}
            style={{ height: "200px" , direction: "ltr" }}
            placeholder={t("start_typing_here")}
          />
        )}
      />
      {/* <Box
        sx={{ fontSize: "14px", color: "#6B7280", textAlign: "right", my: 5}}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              {(field.value?.replace(/<[^>]+>/g, "")?.length || 0)} / 1000
            </>
          )}
        />
      </Box> */}
      {error && (
        <Typography color="error" variant="body2" mt={1}>
          {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default PolicyEditor;
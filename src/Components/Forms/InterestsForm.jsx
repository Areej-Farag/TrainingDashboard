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
import { useTranslation } from "react-i18next";
import useInterstesStore from "../../Stores/InterestsStore";

export default function InterestsForm({
  action,
  propInterest = {},
  setOpen,
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    showInterest,
    addInterest,
    editIntersts,
    getInteresties,
    interest,
    clearInterest,
  } = useInterstesStore();
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
    },
  });

  // Fetch interest data for editing
  useEffect(() => {
    setLoading(true);
    if (action === "Edit Interest" && propInterest?.id) {
      showInterest(propInterest.id)
        .then(() => console.log("Show interest fetched:", interest))
        .catch((error) => console.error("Show interest error:", error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [action, propInterest?.id, showInterest]);

  // Populate form when interest data is available
  useEffect(() => {
    if (
      action === "Edit Interest" &&
      interest?.id &&
      interest.id === propInterest?.id
    ) {
      setValue("id", interest.id);
      setValue("name_ar", interest.name_ar || "");
      setValue("name_en", interest.name_en || "");
      console.log("Populated interest from store:", interest);
    }
  }, [action, interest, propInterest?.id, setValue]);

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    console.log("Submitting form data:", data);
    const formData = new FormData();
    formData.append("id", data.id || "");
    formData.append("name_ar", data.name_ar);
    formData.append("name_en", data.name_en);

    try {
      if (action === "Add Interest") {
        console.log("Calling addInterest with:", formData);
        await addInterest(formData);
        console.log("addInterest completed");
      } else if (action === "Edit Interest" && data.id) {
        console.log("Calling editIntersts with:", formData);
        await editIntersts(formData);
        console.log("editIntersts completed");
      }
      setOpen(false);
      reset();
      clearInterest();
      getInteresties(); // Refresh the list after successful submission
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      // Optionally show an error message to the user via a UI component
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
          clearInterest();
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
        {action === "Add Interest" ? t("Add Interest") : t("Edit Interest")}
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
            </Stack>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {action === "Add Interest" || action === "Edit Interest"
                ? t("Add")
                : t("Edit")}
            </Button>
          </Stack>
        </form>
      )}
    </Stack>
  );
}
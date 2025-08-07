// src/components/ErrorSnackbar.js
import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useErrorStore } from "../Stores/UseErrorsStore";

const ErrorSnackbar = () => {
  const { error, clearError } = useErrorStore();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    clearError();
  };

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%"  }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;

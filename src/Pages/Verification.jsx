import { Stack, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

export default function Verification() {
  const { id } = useParams();

  return (
    <Stack
      sx={{
        width: "90%",
        height: "100vh",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Typography variant="h2"> Verification</Typography>
      <Stack></Stack>
    </Stack>
  );
}

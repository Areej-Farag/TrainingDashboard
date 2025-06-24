import React from "react";
import { Box , Typography } from "@mui/material";

import Line from "../Components/Line";
export default function LineChart() {
  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <Typography variant="h5">Line Chart</Typography>
      <Typography variant="body1">dummy Data about transportation</Typography>
      <Line />
    </Box>
  );
}

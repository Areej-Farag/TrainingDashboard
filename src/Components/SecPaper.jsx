import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";

export default function SecPaper() {

  return (
    <>
    <Paper sx={{ p: 2 , display: "flex", justifyContent: "space-between" , alignItems: "center" , width: "100%" , height: "60px" }}>
      <Box>
        <Typography variant="body1">sec2Paper</Typography>
        <Typography variant="subtitle1">sec2Paper</Typography>
      </Box>
      <Typography variant="subtitle1">2/5/5555</Typography>
      <Box>
        <Button variant="contained" color="secondary" sx={{ width: "60px" , height: "40px"}}> $534.00</Button>
      </Box>
    </Paper>
    </>
  );
}

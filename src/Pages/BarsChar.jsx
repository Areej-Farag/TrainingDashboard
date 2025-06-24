import { Box, Typography } from "@mui/material";
import Bar from "../Components/Bar";

export default function Bars() {
  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <Typography variant="h5">Bar Chart</Typography>
      <Typography variant="body1">dummy Data about food</Typography>
      <Bar />
    </Box>
  );
}

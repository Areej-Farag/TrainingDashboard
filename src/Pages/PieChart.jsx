import { Box , Typography } from "@mui/material";
import Pie from "../Components/Pie";

export default function MyPie() {
  
  return (
    <Box sx={{ width: "100%", height: "80vh" }}>
       <Typography variant="h5">Pie Chart</Typography>
      <Typography variant="body1">dummy Data</Typography>
      <Pie />
    </Box>
  );
}

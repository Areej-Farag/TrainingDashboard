import React from "react";
import { Box, Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import MyPie from "../Components/Pie";
import Geo from "../Components/Geo";
import Line from "../Components/Line";
import Bar from "../Components/Bar";
import ChartPaper from "../Components/ChartPaper";
import { DownloadOutlined } from "@mui/icons-material";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
const Pie1 = [
  {
    id: "ruby",
    label: "ruby",
    value: 483,
    color: "hsl(335, 70%, 50%)",
  },
  {
    id: "java",
    label: "java",
    value: 455,
    color: "hsl(193, 70%, 50%)",
  },
];
const Pie2 = [
  {
    id: "ruby",
    label: "ruby",
    value: 877,
    color: "hsl(335, 70%, 50%)",
  },
  {
    id: "java",
    label: "java",
    value: 255,
    color: "hsl(193, 70%, 50%)",
  },
];
const Pie3 = [
  {
    id: "ruby",
    label: "ruby",
    value: 46,
    color: "hsl(335, 70%, 50%)",
  },
  {
    id: "java",
    label: "java",
    value: 665,
    color: "hsl(193, 70%, 50%)",
  },
];
const Pie4 = [
  {
    id: "ruby",
    label: "ruby",
    value: 400,
    color: "hsl(335, 70%, 50%)",
  },
  {
    id: "java",
    label: "java",
    value: 905,
    color: "hsl(193, 70%, 50%)",
  },
];

export default function Dashboard() {
  const theme = useTheme();
  return (
    <Stack direction="column" spacing={9} sx={{ mt: 2, width: "100%" }}>
      <Button
        variant="contained"
        sx={{
          width: "200px",
          height: "40px",
          alignSelf: { md: "flex-end", xs: "center" },
        }}
      >
        <DownloadOutlined />
        Download Report{" "}
      </Button>
      <Stack
        direction={{ md: "row", xs: "column" }}
        spacing={2}
        sx={{
          width: "100%",
          height: { md: "25vh", xs: "60vh" },
          justifyContent: { md: "space-between", xs: "center" },
          alignItems: "center",
          my: 2,
        }}
      >
        <ChartPaper
          mySchema={"pink_yellowGreen"}
          data={Pie1}
          title="+14,000"
          text="Email Sent"
          icon={
            <MarkEmailUnreadOutlinedIcon
              sx={{ fontSize: "30px", color: theme.palette.secondary.dark }}
            />
          }
          increse="+14%"
        />
        <ChartPaper
          mySchema="red_yellow_blue"
          data={Pie2}
          title="+100,000"
          text="Sales"
          icon={
            <AddShoppingCartOutlinedIcon
              sx={{ fontSize: "30px", color: theme.palette.secondary.dark }}
            />
          }
          increse="+24%"
        />
        <ChartPaper
          mySchema="accent"
          data={Pie3}
          title="+24,000"
          text="New Users"
          icon={
            <Person2OutlinedIcon
              sx={{ fontSize: "30px", color: theme.palette.secondary.dark }}
            />
          }
          increse="+12%"
        />
        <ChartPaper
          mySchema="pastel1"
          data={Pie4}
          title="+24,000"
          text="Discount"
          icon={
            <AllInclusiveOutlinedIcon
              sx={{ fontSize: "30px", color: theme.palette.secondary.dark }}
            />
          }
          increse="+12%"
        />
      </Stack>

      <Stack
      spacing={2}
        direction={{ md: "row-reverse", xs: "column" }}
        sx={{
          my: 2,
          width: "100%",
          height: { md: "60vh", xs: "100vh" },
          justifyContent: { md: "space-between", xs: "center" },
        }}
      >
        <Box sx={{ width: { md: "32%", xs: "100%" }, height: "100%" , overflow: "scroll", display: "flex", flexDirection: "column" , gap: "7px" }}>
          
          <Paper sx={{ p: 2}}>
            <Typography variant="body1" color={theme.palette.secondary.main}>Recent Transactions</Typography>
          </Paper>
            <Paper sx={{ p: 2 , display: "flex", justifyContent: "space-between" , alignItems: "center" , width: "100%" , height: "60px" }}>
              <Box>
                <Typography variant="subtitle1">sec2Paper</Typography>
                <Typography variant="subtitle2">sec2Paper</Typography>
              </Box>
              <Typography variant="subtitle2">2/5/5555</Typography>
              <Box>
                <Button variant="contained" color="secondary" sx={{ width: "60px" , height: "40px"}}> $534.00</Button>
              </Box>
            </Paper>
              <Paper sx={{ p: 2 , display: "flex", justifyContent: "space-between" , alignItems: "center" , width: "100%" , height: "60px" }}>
              <Box>
                <Typography variant="subtitle1">sec2Paper</Typography>
                <Typography variant="subtitle2">sec2Paper</Typography>
              </Box>
              <Typography variant="subtitle2">2/5/5555</Typography>
              <Box>
                <Button variant="contained" color="secondary" sx={{ width: "60px" , height: "40px"}}> $534.00</Button>
              </Box>
            </Paper>
            <Paper sx={{ p: 2 , display: "flex", justifyContent: "space-between" , alignItems: "center" , width: "100%" , height: "60px" }}>
              <Box>
                <Typography variant="subtitle1">sec2Paper</Typography>
                <Typography variant="subtitle2">sec2Paper</Typography>
              </Box>
              <Typography variant="subtitle2">2/5/5555</Typography>
              <Box>
                <Button variant="contained" color="secondary" sx={{ width: "60px" , height: "40px"}}> $534.00</Button>
              </Box>
            </Paper>
              <Paper sx={{ p: 2 , display: "flex", justifyContent: "space-between" , alignItems: "center" , width: "100%" , height: "60px" }}>
              <Box>
                <Typography variant="subtitle1">sec2Paper</Typography>
                <Typography variant="subtitle2">sec2Paper</Typography>
              </Box>
              <Typography variant="subtitle2">2/5/5555</Typography>
              <Box>
                <Button variant="contained" color="secondary" sx={{ width: "60px" , height: "40px"}}> $534.00</Button>
              </Box>
            </Paper>
              <Paper sx={{ p: 2 , display: "flex", justifyContent: "space-between" , alignItems: "center" , width: "100%" , height: "60px" }}>
              <Box>
                <Typography variant="subtitle1">sec2Paper</Typography>
                <Typography variant="subtitle2">sec2Paper</Typography>
              </Box>
              <Typography variant="subtitle2">2/5/5555</Typography>
              <Box>
                <Button variant="contained" color="secondary" sx={{ width: "60px" , height: "40px"}}> $534.00</Button>
              </Box>
            </Paper>
              <Paper sx={{ p: 2 , display: "flex", justifyContent: "space-between" , alignItems: "center" , width: "100%" , height: "60px" }}>
              <Box>
                <Typography variant="subtitle1">sec2Paper</Typography>
                <Typography variant="subtitle2">sec2Paper</Typography>
              </Box>
              <Typography variant="subtitle2">2/5/5555</Typography>
              <Box>
                <Button variant="contained" color="secondary" sx={{ width: "60px" , height: "40px"}}> $534.00</Button>
              </Box>
            </Paper>
              <Paper sx={{ p: 2 , display: "flex", justifyContent: "space-between" , alignItems: "center" , width: "100%" , height: "60px" }}>
              <Box>
                <Typography variant="subtitle1">sec2Paper</Typography>
                <Typography variant="subtitle2">sec2Paper</Typography>
              </Box>
              <Typography variant="subtitle2">2/5/5555</Typography>
              <Box>
                <Button variant="contained" color="secondary" sx={{ width: "60px" , height: "40px"}}> $534.00</Button>
              </Box>
            </Paper>
        </Box>
        <Paper
          sx={{
            width: { md: "66%", xs: "100%" },
            height: "100%",
            p: "25px 10px",
          }}
        >
          <Line title="Revenue Report" text="$290,310,000" />
        </Paper>
      </Stack>

      <Stack
        direction={{ md: "row", xs: "column" }}
        spacing={1}
        sx={{
          mt: 2,
          width: "100%",
          height: { md: "60vh", xs: "160vh" },
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{ width: { md: "33%", xs: "100%" }, height: "100%", p: "10px" }}
        >
          <MyPie title="Campaign" />
        </Paper>
        <Paper
          sx={{ width: { md: "33%", xs: "100%" }, height: "100%", p: "10px" }}
        >
          <Bar title="Sales Report" />
        </Paper>
        <Paper
          sx={{ width: { md: "33%", xs: "100%" }, height: "100%", p: "10px" }}
        >
          <Geo title="Geography based traffic" />
        </Paper>
      </Stack>
    </Stack>
  );
}

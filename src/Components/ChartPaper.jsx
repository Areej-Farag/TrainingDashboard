import React from "react";
import { Box, Typography, Paper , useTheme} from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

export default function ChartPaper({ data, title, text, icon, increse , mySchema }) {
      const theme = useTheme();
      const Mytheme = {
        // background: "#ffffff",
        text: {
          fontSize: 11,
          fill:theme.palette.text.primary,
          outlineWidth: 0,
          outlineColor: "#ffffff",
        },
        axis: {
          domain: {
            line: {
              stroke: theme.palette.text.primary,
              strokeWidth: 1,
            },
          },
          legend: {
            text: {
              color: "#ffffff",
              fontSize: 12,
              fill: theme.palette.text.primary,
              outlineWidth: 0,
              outlineColor: "#ffffff",
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.text.primary,
              strokeWidth: 1,
            },
            text: {
              fontSize: 11,
              fill: theme.palette.text.primary,
              outlineWidth: 0,
              outlineColor: "#ffffff",
            },
          },
        },
        grid: {
          line: {
            stroke: theme.palette.text.primary,
            strokeWidth: 1,
          },
        },
        legends: {
          title: {
            text: {
              fontSize: 11,
              fill: theme.palette.text.primary,
              outlineWidth: 0,
              outlineColor: "#ffffff",
            },
          },
          text: {
            fontSize: 11,
            fill: theme.palette.text.primary,
            outlineWidth: 0,
            outlineColor: "#ffffff",
          },
          ticks: {
            line: {},
            text: {
              fontSize: 10,
              fill: theme.palette.text.primary,
              outlineWidth: 0,
              outlineColor: "#ffffff",
            },
          },
        },
        annotations: {
          text: {
            fontSize: 13,
            fill: theme.palette.text.primary,
            outlineWidth: 2,
            outlineColor: "#ffffff",
            outlineOpacity: 1,
          },
          link: {
            stroke: "#000000",
            strokeWidth: 1,
            outlineWidth: 2,
            outlineColor: "#ffffff",
            outlineOpacity: 1,
          },
          outline: {
            stroke: "#000000",
            strokeWidth: 2,
            outlineWidth: 2,
            outlineColor: "#ffffff",
            outlineOpacity: 1,
          },
          symbol: {
            fill: "#000000",
            outlineWidth: 2,
            outlineColor: "#ffffff",
            outlineOpacity: 1,
          },
        },
        tooltip: {
          wrapper: {},
          container: {
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            fontSize: 12,
          },
          basic: {},
          chip: {},
          table: {},
          tableCell: {},
          tableCellValue: {},
        },
      };
    
  return (
    <Paper
      sx={{
        display: "flex",
        height: "100%",
        width: "310px",
        p: "10px",
        justifyContent: "space-between",
        background: theme.palette.divider,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1.5,
        }}
      >
        {icon}
        <Typography variant="body1">{title}</Typography>
        <Typography variant="subtitle1">{text}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" , alignItems:"center" , justifyContent:"center"  }}>
        <Box sx={{ width: "100px",height: { xs: "80px", md: "100px"} }}>
          <ResponsivePie /* or Pie for fixed dimensions */
            theme={Mytheme}
            data={data}
            margin={{ top: 60, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.7}
            padAngle={0.6}
            cornerRadius={2}
            activeOuterRadiusOffset={8}
            colors={{ scheme: mySchema }}
            enableArcLabels={false}
            enableArcLinkLabels={false}

          />
        </Box>
        <Typography variant="subtitle2"> {increse}</Typography>

        {/* <Pie  data={data}/> */}
      </Box>
    </Paper>
  );
}

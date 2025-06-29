import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme , Typography , useMediaQuery } from "@mui/material";

const MyData = [
  {
    id: "japan",
    data: [
      {
        x: "plane",
        y: 208,
      },
      {
        x: "helicopter",
        y: 58,
      },
      {
        x: "boat",
        y: 35,
      },
      {
        x: "train",
        y: 120,
      },
      {
        x: "subway",
        y: 117,
      },
      {
        x: "bus",
        y: 31,
      },
      {
        x: "car",
        y: 80,
      },
      {
        x: "moto",
        y: 289,
      },
      {
        x: "bicycle",
        y: 160,
      },
      {
        x: "horse",
        y: 171,
      },
      {
        x: "skateboard",
        y: 148,
      },
      {
        x: "others",
        y: 217,
      },
    ],
  },
  {
    id: "france",
    data: [
      {
        x: "plane",
        y: 82,
      },
      {
        x: "helicopter",
        y: 82,
      },
      {
        x: "boat",
        y: 75,
      },
      {
        x: "train",
        y: 238,
      },
      {
        x: "subway",
        y: 200,
      },
      {
        x: "bus",
        y: 219,
      },
      {
        x: "car",
        y: 182,
      },
      {
        x: "moto",
        y: 94,
      },
      {
        x: "bicycle",
        y: 124,
      },
      {
        x: "horse",
        y: 205,
      },
      {
        x: "skateboard",
        y: 17,
      },
      {
        x: "others",
        y: 76,
      },
    ],
  },
  {
    id: "us",
    data: [
      {
        x: "plane",
        y: 236,
      },
      {
        x: "helicopter",
        y: 268,
      },
      {
        x: "boat",
        y: 30,
      },
      {
        x: "train",
        y: 240,
      },
      {
        x: "subway",
        y: 8,
      },
      {
        x: "bus",
        y: 285,
      },
      {
        x: "car",
        y: 228,
      },
      {
        x: "moto",
        y: 140,
      },
      {
        x: "bicycle",
        y: 234,
      },
      {
        x: "horse",
        y: 295,
      },
      {
        x: "skateboard",
        y: 251,
      },
      {
        x: "others",
        y: 205,
      },
    ],
  },
  {
    id: "germany",
    data: [
      {
        x: "plane",
        y: 186,
      },
      {
        x: "helicopter",
        y: 59,
      },
      {
        x: "boat",
        y: 98,
      },
      {
        x: "train",
        y: 277,
      },
      {
        x: "subway",
        y: 155,
      },
      {
        x: "bus",
        y: 243,
      },
      {
        x: "car",
        y: 182,
      },
      {
        x: "moto",
        y: 61,
      },
      {
        x: "bicycle",
        y: 299,
      },
      {
        x: "horse",
        y: 135,
      },
      {
        x: "skateboard",
        y: 20,
      },
      {
        x: "others",
        y: 234,
      },
    ],
  },
  {
    id: "norway",
    data: [
      {
        x: "plane",
        y: 12,
      },
      {
        x: "helicopter",
        y: 199,
      },
      {
        x: "boat",
        y: 277,
      },
      {
        x: "train",
        y: 47,
      },
      {
        x: "subway",
        y: 260,
      },
      {
        x: "bus",
        y: 239,
      },
      {
        x: "car",
        y: 125,
      },
      {
        x: "moto",
        y: 127,
      },
      {
        x: "bicycle",
        y: 267,
      },
      {
        x: "horse",
        y: 165,
      },
      {
        x: "skateboard",
        y: 199,
      },
      {
        x: "others",
        y: 230,
      },
    ],
  },
];
export default function Line({ data = MyData ,  title ="" , text="" }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const Mytheme = {
    // background: "#ffffff",
    text: {
      fontSize: 11,
      fill: theme.palette.text.primary,
      outlineWidth: 0,
      outlineColor: "#ffffff",
    },
    axis: {
      domain: {
        line: {
          stroke: theme.palette.divider,
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
          stroke: theme.palette.divider,
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
        stroke: theme.palette.divider,
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
    <Box sx={{ width: "100%", height: "90%" }}>
         <Typography variant="h5">{title}</Typography>
      <Typography variant="body1">{text}</Typography>
     <ResponsiveLine
  data={data}
  theme={Mytheme}
  margin={{
    top: 50,
    right: isMobile ? 20 : 110,
    bottom: isMobile ? 90 : 50,
    left: isMobile ? 35 : 60,
  }}
  yScale={{
    type: "linear",
    min: "auto",
    max: "auto",
    stacked: true,
    reverse: false,
  }}
  curve="catmullRom"
  axisBottom={{
    legend: "transportation",
    legendOffset: isMobile ? 36 : 36,
    tickRotation: isMobile ? -30 : 0,
  }}
  axisLeft={{
    legend: isMobile ? "" : "count",
    legendOffset: -44,
  }}
  pointSize={8}
  pointColor={{ theme: "background" }}
  pointBorderWidth={2}
  pointBorderColor={{ from: "seriesColor" }}
  pointLabelYOffset={-12}
  enableTouchCrosshair={true}
  useMesh={true}
  legends={[
    {
      anchor: isMobile ? "bottom" : "bottom-right",
      direction: isMobile ? "row" : "column",
      translateX: isMobile ? 0 : 100,
      translateY: isMobile ? 70 : 0,
      itemWidth: isMobile ? 80 : 80,
      itemHeight: 22,
      symbolShape: "circle",
    },
  ]}
/>

    </Box>
  );
}

import { Box, Typography, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

const Mydata = [
  {
    year: 2019,
    Spain: 900,
    France: 1400,
    Germany: 1700,
  },

  {
    year: 2020,
    Spain: 1000,
    France: 1500,
    Germany: 1800,
  },

  {
    year: 2021,
    Spain: 1100,
    France: 1600,
    Germany: 1900,
  },

  {
    year: 2022,
    Spain: 1200,
    France: 1700,
    Germany: 2000,
  },

  {
    year: 2023,
    Spain: 1260,
    France: 1709,
    Germany: 2080,
  },
];

export default function Bars({ data = Mydata ,  title ="" , text="" }) {
  const theme = useTheme();
  const Mytheme = {
  // background: "#ffffff",
  text: {
    fontSize: 11,
    fill: "#ffffff",
    outlineWidth: 0,
    outlineColor: "#ffffff",
  },
  axis: {
    domain: {
      line: {
        
        stroke: "#777777",
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
        stroke: "#777777",
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
      stroke: "#dddddd",
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
    <Box sx={{ height: "95%", width: "100%"  }} justifyContent={"center"}>
         <Typography variant="h5">{title}</Typography>
      <Typography variant="body1">{text}</Typography>
      <ResponsiveBar
      theme={Mytheme}
        data={data}
        keys={["Spain", "France", "Germany"]} // ✅ لازم
        indexBy="year"
        labelSkipWidth={12}
        labelSkipHeight={12}
        colors={{ scheme: "purple_orange" }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            translateX: 120,
            itemsSpacing: 3,
            itemWidth: 100,
            itemHeight: 16,
          },
        ]}
        axisBottom={{ legend: "year", legendOffset: 32 }}
        axisLeft={{ legend: "minimum wage / month", legendOffset: -50 }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      />
    </Box>
  );
}

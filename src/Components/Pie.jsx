import { Box, useTheme, Typography , useMediaQuery} from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

const Mydata = [
  {
    id: "erlang",
    label: "erlang",
    value: 438,
    color: "hsl(189, 70%, 50%)",
  },
  {
    id: "ruby",
    label: "ruby",
    value: 483,
    color: "hsl(335, 70%, 50%)",
  },
  {
    id: "haskell",
    label: "haskell",
    value: 388,
    color: "hsl(346, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 187,
    color: "hsl(293, 70%, 50%)",
  },
  {
    id: "java",
    label: "java",
    value: 455,
    color: "hsl(193, 70%, 50%)",
  },
];

export default function MyPie({ data = Mydata, title = "", text = "" }) {
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
    <Box sx={{ width: "100%", height: "95%" }}>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body1">{text}</Typography>
      <ResponsivePie /* or Pie for fixed dimensions */
        theme={Mytheme}
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "purple_blue_green" }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.text.primary}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 56,
            itemWidth: isMobile ? 60 : 80,
            itemHeight: 18,
            symbolShape: "circle",
          },
        ]}
      />
    </Box>
  );
}

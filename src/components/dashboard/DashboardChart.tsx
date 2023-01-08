import React from "react";
import { Box, Theme, Typography, useTheme } from "@mui/material";
import {
  Chart,
  BarSeries,
  ValueAxis,
  ArgumentAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { ValueScale, Animation } from "@devexpress/dx-react-chart";
import { useTranslation } from "react-i18next";
import { ResponsiveBar } from "@nivo/bar";

export default function DashboardChart() {
  const { t } = useTranslation();
  const theme: Theme = useTheme();
  type dataType = {
    month: string;
    avgIncome: number;
    color?: string;
  };
  const data: dataType[] = [
    { month: t("month1"), avgIncome: 25000 },
    { month: t("month2"), avgIncome: 50000 },
    { month: t("month3"), avgIncome: 100000 },
    { month: t("month4"), avgIncome: 50000 },
    { month: t("month5"), avgIncome: 60000 },
    // { month: "اسفند", avgIncome: 60000 },
    // { month: "فروردین", avgIncome: 55000 },
    // { month: "اردیبهشت", avgIncome: 15000 },
    // { month: "خرداد", avgIncome: 5000 },
    // { month: "تیر", avgIncome: 10000 },
    // { month: "مرداد", avgIncome: 15000 },
    // { month: "شهریور", avgIncome: 17000 },
  ];

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      component={"div"}
      height={theme.spacing(25)}
      padding={1.5}
      sx={[
        {
          backgroundColor: (theme: Theme) =>
            theme.palette.mode === "dark"
              ? "bgPrimary.dark"
              : "bgPrimary.light",
          boxShadow: 1,
          borderRadius: 2,
          width: "50%",
        },
        (theme) => ({
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
        }),
      ]}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        fontSize={18}
        sx={{
          color: (theme: Theme) =>
            theme.palette.mode === "dark"
              ? "textPrimary.dark"
              : "textPrimary.light",
        }}
      >
        {t("avg_income")}
      </Typography>
      {/* Chart from navico */}
      <ResponsiveBar
        data={data}
        keys={["avgIncome"]}
        indexBy="month"
        margin={{ top: 10, right: 10, bottom: 35, left: 10 }}
        padding={0.3}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: `${theme.palette.primary.main}`,
                display: "none",
              },
            },
            legend: {
              text: {
                fill: `${theme.palette.primary.main}`,
                color: `${theme.palette.primary.main}`,
              },
            },
            ticks: {
              line: {
                stroke: `${theme.palette.primary.main}`,
                strokeWidth: 1,
              },
              text: {
                fill: `${
                  theme.palette.mode === "dark"
                    ? theme.palette.textPrimary.main
                    : theme.palette.textPrimary.light
                }`,
                fontFamily: `${theme.typography.fontFamily}`,
              },
            },
          },
        }}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={[theme.palette.primary.main, theme.palette.secondary.main]}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.2]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,

          legendOffset: 0,
        }}
        axisLeft={null}
        enableGridY={false}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={18}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[]}
        isInteractive={false}
        role="application"
      />
    </Box>
  );
}

// <Chart height={Number.parseInt(theme.spacing(20))} data={data}>
{
  /* <ArgumentAxis />
        <ValueAxis /> */
}
{
  /* <ArgumentAxis /> */
}
{
  /* <ArgumentAxis /> */
}

//   <BarSeries
//     color="#7B60FF"
//     valueField="avgIncome"
//     argumentField="month"
//     barWidth={1}
//     name="میانگین درآمد"
//   />
//   <Animation />
// </Chart>

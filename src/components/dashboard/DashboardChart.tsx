import React from "react";
import { Box, Theme, Typography, useTheme } from "@mui/material";
import {
  Chart,
  BarSeries,
  ValueAxis,
  ArgumentAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { ValueScale, Animation } from "@devexpress/dx-react-chart";

export default function DashboardChart() {
  const theme: Theme = useTheme();
  type dataType = {
    month: string;
    avgIncome: number;
  };
  const data: dataType[] = [
    { month: "مهر", avgIncome: 25000 },
    { month: "آبان", avgIncome: 50000 },
    { month: "آذر", avgIncome: 100000 },
    { month: "دی", avgIncome: 50000 },
    { month: "بهمن", avgIncome: 60000 },
  ];

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      component={"div"}
      width={"50%"}
      height={theme.spacing(25)}
      padding={1.5}
      sx={{
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === "dark" ? "bgPrimary.dark" : "bgPrimary.light",
        boxShadow: 1,
        borderRadius: 2,
      }}
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
        میانگین درآمد ماهیانه
      </Typography>
      <Chart height={Number.parseInt(theme.spacing(20))} data={data}>
        {/* <ArgumentAxis />
        <ValueAxis /> */}
        {/* <ArgumentAxis /> */}
        {/* <ArgumentAxis /> */}

        <BarSeries
          color="#7B60FF"
          valueField="avgIncome"
          argumentField="month"
          barWidth={1}
          name="میانگین درآمد"
        />
        <Animation />
      </Chart>
    </Box>
  );
}

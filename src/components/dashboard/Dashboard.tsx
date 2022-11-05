import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import DashboardCards from "./DashboardCards";
import DashboardChart from "./DashboardChart";

export default function Dashboard() {
  return (
    <Stack direction={"column"} spacing={3}>
      <Typography
        fontWeight={600}
        fontSize={25}
        variant="h2"
        sx={[
          {
            color: (theme) =>
              theme.palette.mode === "dark"
                ? "textPrimary.dark"
                : "textPrimary.light",
          },
        ]}
      >
        داشبورد
      </Typography>
      <Stack sx={{ width: "fit-content" }} direction={"row"}>
        <DashboardCards />
        <DashboardChart />
      </Stack>
    </Stack>
  );
}

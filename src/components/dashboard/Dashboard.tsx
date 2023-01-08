import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import DashboardCards from "./DashboardCards";
import DashboardChart from "./DashboardChart";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
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
        {t("dashboard")}
      </Typography>
      <Stack
        sx={[
          { width: "fit-content" },
          (theme) => ({
            [theme.breakpoints.down("md")]: {
              flexWrap: "wrap",
              gap: 2,
            },
          }),
        ]}
        direction={"row"}
      >
        <DashboardCards />
        <DashboardChart />
      </Stack>
    </Stack>
  );
}

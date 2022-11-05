import { Box, Theme } from "@mui/material";
import React from "react";
import DashboardCard from "./DashboardCard";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import DashboardCardContent from "./DashboardCardContent";

export default function DashboardCards() {
  const iconStyles = {
    width: "50%",
    fontSize: (theme: Theme) => theme.spacing(8),
  };
  return (
    <Box width={"50%"} display={"flex"} flexWrap={"wrap"} gap={1}>
      <DashboardCard
        icon={<BarChartRoundedIcon sx={iconStyles} />}
        type={"primary"}
        content={<DashboardCardContent title="1900" text="بازدید امروز" />}
      />
      <DashboardCard
        icon={<PeopleOutlineRoundedIcon sx={iconStyles} />}
        type={"warning"}
        content={<DashboardCardContent title="500" text="کاربر جدید" />}
      />
      <DashboardCard
        icon={<CurrencyExchangeRoundedIcon sx={iconStyles} />}
        type={"info"}
        content={<DashboardCardContent title="2500t" text="کل فروش ها" />}
      />
      <DashboardCard
        icon={<InventoryRoundedIcon sx={iconStyles} />}
        type={"secondary"}
        content={<DashboardCardContent title="854" text="سفارش جدید" />}
      />
    </Box>
  );
}

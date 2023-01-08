import { Box, Theme } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import DashboardCardContent from "./DashboardCardContent";
import { useTranslation } from "react-i18next";
import HttpRequest from "../../services/HttpRequest";

interface SalesRes {
  data: number;
}

export default function DashboardCards() {
  const { t } = useTranslation();
  const iconStyles = {
    width: "50%",
    fontSize: (theme: Theme) => theme.spacing(8),
  };

  const [users, setUsers] = useState<number>(0);
  const [orders, setOrders] = useState<number>(0);
  const [sales, setSales] = useState<number>(0);

  useEffect(() => {
    const http = new HttpRequest();
    http.get<object[]>("api/v1/admin/users/all").then((res) => {
      setUsers(res.data.length);
    });
    http.get<object[]>("api/v1/admin/orders/all").then((res) => {
      setOrders(res.data.length);
    });
    http.get<SalesRes>("api/v1/admin/payments/sales").then((res) => {
      setSales(res.data.data);
      // console.log(res.data);
    });
  }, []);

  return (
    <Box
      sx={[
        {
          width: "50%",
        },
        (theme: Theme) => ({
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
        }),
      ]}
      display={"flex"}
      flexWrap={"wrap"}
      gap={1}
    >
      <DashboardCard
        icon={<BarChartRoundedIcon sx={iconStyles} />}
        type={"primary"}
        content={<DashboardCardContent title="1900" text={t("views")} />}
      />
      <DashboardCard
        icon={<PeopleOutlineRoundedIcon sx={iconStyles} />}
        type={"warning"}
        content={
          <DashboardCardContent title={`${users}`} text={t("new_users")} />
        }
      />
      <DashboardCard
        icon={<CurrencyExchangeRoundedIcon sx={iconStyles} />}
        type={"info"}
        content={<DashboardCardContent title={`${sales}t`} text={t("sales")} />}
      />
      <DashboardCard
        icon={<InventoryRoundedIcon sx={iconStyles} />}
        type={"secondary"}
        content={
          <DashboardCardContent title={`${orders}`} text={t("new_orders")} />
        }
      />
    </Box>
  );
}

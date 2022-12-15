import { Box, Stack } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import OrderStatusBar from "./OrderStatusBar";

export default function OrderStatusBarContainer() {
  const { t } = useTranslation();
  return (
    <Stack padding={1.5} gap={3}>
      <OrderStatusBar
        value={354}
        min={0}
        max={854}
        step={50}
        title={t("sent")}
        enTitle={"Sended Orders"}
      />
      <OrderStatusBar
        value={102}
        min={0}
        max={854}
        step={50}
        title={t("delivered")}
        enTitle={"deliverd Orders"}
      />
      <OrderStatusBar
        value={203}
        min={0}
        max={854}
        step={50}
        title={t("paid")}
        enTitle={"Paid Orders"}
      />
      <OrderStatusBar
        value={56}
        min={0}
        max={854}
        step={50}
        title={t("refunded")}
        enTitle={"Funded Orders"}
      />
    </Stack>
  );
}

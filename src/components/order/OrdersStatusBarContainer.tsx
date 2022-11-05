import { Box, Stack } from "@mui/material";
import React from "react";
import OrderStatusBar from "./OrderStatusBar";

export default function OrderStatusBarContainer() {
  return (
    <Stack padding={1.5} gap={3}>
      <OrderStatusBar
        value={354}
        min={0}
        max={854}
        step={50}
        title={"ارسال شده"}
        enTitle={"Sended Orders"}
      />
      <OrderStatusBar
        value={102}
        min={0}
        max={854}
        step={50}
        title={"تحویل داده شده"}
        enTitle={"deliverd Orders"}
      />
      <OrderStatusBar
        value={203}
        min={0}
        max={854}
        step={50}
        title={"پرداخت شده"}
        enTitle={"Paid Orders"}
      />
      <OrderStatusBar
        value={56}
        min={0}
        max={854}
        step={50}
        title={"مرجوع شده"}
        enTitle={"Funded Orders"}
      />
    </Stack>
  );
}

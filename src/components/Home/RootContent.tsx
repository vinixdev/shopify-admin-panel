import { Box } from "@mui/material";
import React from "react";
import Dashboard from "../dashboard/Dashboard";
import OrdersStatus from "../order/OrdersStatus";

export default function RootContent() {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
      <Dashboard />
      <OrdersStatus />
    </Box>
  );
}

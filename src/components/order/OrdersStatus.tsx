import React from "react";
import { Box, Typography } from "@mui/material";
import OrderStatusBarContainer from "./OrdersStatusBarContainer";

export default function OrdersStatus() {
  return (
    <Box
      display={"block"}
      minHeight={230}
      borderRadius={2.5}
      padding={2.5}
      sx={[
        {
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "bgPrimary.dark"
              : "bgPrimary.light",
          boxShadow: 3,
        },
      ]}
    >
      <Typography
        variant="h2"
        fontWeight={600}
        fontSize={23}
        sx={[
          {
            color: (theme) =>
              theme.palette.mode === "dark"
                ? "textPrimary.dark"
                : "textPrimary.light",
          },
        ]}
      >
        وضعیت سفارش ها
      </Typography>
      <OrderStatusBarContainer />
    </Box>
  );
}

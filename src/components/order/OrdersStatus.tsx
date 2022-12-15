import React from "react";
import { Box, Typography } from "@mui/material";
import OrderStatusBarContainer from "./OrdersStatusBarContainer";
import { useTranslation } from "react-i18next";

export default function OrdersStatus() {
  const { t } = useTranslation();

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
        {t("orders_status")}
      </Typography>
      <OrderStatusBarContainer />
    </Box>
  );
}

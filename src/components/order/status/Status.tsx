import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import OrderStatus from "./OrderStatus";

interface OrderStatusInterface {
  status: number;
}

export default function Status({ status }: OrderStatusInterface) {
  const { t } = useTranslation();

  let text: string = "";
  if (status === OrderStatus.INIT) {
    text = t("init");
  } else if (status === OrderStatus.PAID) {
    text = t("paid");
  } else if (status === OrderStatus.REFUNDED) {
    text = t("refunded");
  } else if (status === OrderStatus.CONFIRMED) {
    text = t("confirmed");
  } else if (status === OrderStatus.INVENTORY) {
    text = t("inventory");
  } else if (status === OrderStatus.READY) {
    text = t("ready");
  } else if (status === OrderStatus.SENT) {
    text = t("sent");
  } else if (status === OrderStatus.DELIVERED) {
    text = t("delivered");
  } else if (status === OrderStatus.CANCELED) {
    text = t("cancelled");
  }

  return (
    <Typography
      variant="h3"
      fontSize={11}
      textAlign={"center"}
      fontWeight={500}
    >
      {text}
    </Typography>
  );
}

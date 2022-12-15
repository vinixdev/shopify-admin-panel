import React from "react";
import { Typography } from "@mui/material";
import ShipmentStatus from "./ShipmentStatus";
import { useTranslation } from "react-i18next";

interface statusProps {
  status: number;
}

export default function ShipmentShowStatus({ status }: statusProps) {
  const { t } = useTranslation();
  let text;

  if (status === ShipmentStatus.ABSENT) {
    text = t("absent");
  } else if (status === ShipmentStatus.DELIVERED) {
    text = t("delivered");
  } else if (status === ShipmentStatus.PENDING) {
    text = t("pending");
  } else if (status === ShipmentStatus.PICKED_UP) {
    text = t("picked_up");
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

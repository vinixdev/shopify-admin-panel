import React from "react";
import { Typography } from "@mui/material";
import CouponStatus from "./CouponStatus";
import { useTranslation } from "react-i18next";

interface statusProps {
  status: number;
}

export default function PaymentStatusShow({ status }: statusProps) {
  const { t } = useTranslation();

  let text;

  if (status === CouponStatus.ACTIVE) {
    text = t("active");
  } else if (status === CouponStatus.INACTIVE) {
    text = t("inactive");
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

import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import PaymentStatus from "./PaymentStatus";

interface statusProps {
  status: number;
}

export default function PaymentStatusShow({ status }: statusProps) {
  const { t } = useTranslation();

  let text;

  if (status === PaymentStatus.SUCCESS) {
    text = t("success");
  } else if (status === PaymentStatus.PENDING) {
    text = t("pending");
  } else if (status === PaymentStatus.FAILED) {
    text = t("failed");
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

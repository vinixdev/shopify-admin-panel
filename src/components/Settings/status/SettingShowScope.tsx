import React from "react";
import { Typography } from "@mui/material";
import SettingScope from "./SettingScope";
import { useTranslation } from "react-i18next";

interface statusProps {
  status: number;
}

export default function PaymentStatusShow({ status }: statusProps) {
  const { t } = useTranslation();

  let text;

  if (status === SettingScope.PUBLIC) {
    text = t("public");
  } else if (status === SettingScope.PRIVATE) {
    text = t("private");
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

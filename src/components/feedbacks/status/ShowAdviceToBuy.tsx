import React from "react";
import { Typography } from "@mui/material";
import AdviseToBuy from "./AdviceToBuy";
import { useTranslation } from "react-i18next";

interface statusProps {
  status: number;
}

export default function ShowAdviceToBuy({ status }: statusProps) {
  const { t } = useTranslation();

  let text;

  if (status === AdviseToBuy.YES) {
    text = t("yes");
  } else if (status === AdviseToBuy.NO) {
    text = t("no");
  } else if (status === AdviseToBuy.NOT_SURE) {
    text = t("not_sure");
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

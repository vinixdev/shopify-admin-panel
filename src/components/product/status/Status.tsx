import React from "react";
import { useTranslation } from "react-i18next";
import { ProductStatus } from "./productEnum";

interface StatusProps {
  status: number;
}

export default function Status({ status }: StatusProps) {
  const { t } = useTranslation();

  let text;
  if (status === ProductStatus.ACTIVE) {
    text = t("active");
  } else if (status === ProductStatus.DEACTIVE) {
    text = t("inactive");
  } else if (status === ProductStatus.PUBLISHED) {
    text = t("published");
  }
  return <div>{text}</div>;
}

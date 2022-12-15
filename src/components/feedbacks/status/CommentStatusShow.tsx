import React from "react";
import { Typography } from "@mui/material";
import CommentStatus from "./CommentStatus";
import { useTranslation } from "react-i18next";

interface statusProps {
  status: number;
}

export default function CommentStatusShow({ status }: statusProps) {
  const { t } = useTranslation();
  let text;

  if (status === CommentStatus.APPROVED) {
    text = t("confirmed");
  } else if (status === CommentStatus.PENDING) {
    text = t("pending");
  } else if (status === CommentStatus.REJECTED) {
    text = t("rejected");
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

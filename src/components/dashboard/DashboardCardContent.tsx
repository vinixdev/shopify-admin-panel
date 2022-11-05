import { Typography } from "@mui/material";
import React from "react";

interface PropsInterface {
  title: string;
  text: string;
}

export default function DashboardCardContent(props: PropsInterface) {
  return (
    <>
      <Typography fontSize={18} fontWeight={600} variant="h4">
        {props.title}
      </Typography>
      <Typography fontSize={16} fontWeight={600} variant="h5">
        {props.text}
      </Typography>
    </>
  );
}

import { Typography } from "@mui/material";
import React from "react";

interface PropsInterface {
  title: string;
  text: string;
}

export default function DashboardCardContent(props: PropsInterface) {
  return (
    <>
      <Typography
        sx={[
          {
            fontSize: 18,
          },
          (theme) => ({
            [theme.breakpoints.down("md")]: {
              fontSize: theme.spacing(1.6),
            },
          }),
        ]}
        fontWeight={600}
        variant="h4"
      >
        {props.title}
      </Typography>
      <Typography
        sx={[
          {
            fontSize: 16,
          },
          (theme) => ({
            [theme.breakpoints.down("md")]: {
              fontSize: theme.spacing(1.4),
            },
          }),
        ]}
        fontWeight={600}
        variant="h5"
      >
        {props.text}
      </Typography>
    </>
  );
}

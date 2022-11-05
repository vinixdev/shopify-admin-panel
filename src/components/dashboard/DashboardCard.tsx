import { Box, Stack, Theme, useTheme } from "@mui/material";
import React from "react";

interface PropsInterface {
  icon: React.ReactElement;
  content: React.ReactElement;
  type: string;
}

// interface BgColor {
//   primary: string;
//   secondary: string;
//   warning: string;
//   info: string;
// }

export default function DashboardCard(props: PropsInterface) {
  const theme: Theme = useTheme();

  type BgColor = {
    primary: string;
    secondary: string;
    warning: string;
    info: string;
  };

  const bgColor: BgColor = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
  };

  const bgType: string = props.type;
  const color: string = bgColor[bgType as keyof BgColor];

  return (
    <Box
      component={"div"}
      width={200}
      height={100}
      display={"flex"}
      alignItems={"center"}
      gap={1}
      sx={{
        backgroundColor: color,
        borderRadius: 5,
        boxShadow: 3,
        color: "textPrimary.main",
        padding: 0.5,
      }}
    >
      {props.icon}
      <Stack direction={"column"} alignItems={"center"} spacing={0.5}>
        {props.content}
      </Stack>
    </Box>
  );
}

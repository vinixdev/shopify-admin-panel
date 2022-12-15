import React from "react";
import { Box, Stack, Theme, Typography } from "@mui/material";
import ArrowDropDownCircleRoundedIcon from "@mui/icons-material/ArrowDropDownCircleRounded";

interface DropDownVariantProps {
  title: string;
  value: string;
}

export default function DropdownVariant({
  title,
  value,
}: DropDownVariantProps) {
  return (
    <Stack direction={"row"} gap={1} paddingX={1} alignItems={"center"}>
      <ArrowDropDownCircleRoundedIcon fontSize="small" />
      <Typography variant="h6" fontSize={10} fontWeight={500}>
        {title}
      </Typography>
    </Stack>
  );
}

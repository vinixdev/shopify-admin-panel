import React from "react";
import { Box, Stack, Theme, Typography } from "@mui/material";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";

interface ColorVariantProps {
  title: string;
  value: string;
}

export default function ColorVariant({ title, value }: ColorVariantProps) {
  return (
    <Stack direction={"row"} gap={1} paddingX={1} alignItems={"center"}>
      <ColorLensRoundedIcon fontSize="small" />
      <Typography variant="h6" fontSize={10} fontWeight={500}>
        {title}
      </Typography>

      <Box
        sx={{
          width: (theme: Theme) => theme.spacing(1.8),
          height: (theme: Theme) => theme.spacing(1.8),
          borderRadius: "50%",
          border: "2px solid #E7E7EF",
          backgroundColor: value,
          marginLeft: "auto",
        }}
      />
    </Stack>
  );
}

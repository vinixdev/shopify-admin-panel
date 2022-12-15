import { Box, Divider, Typography } from "@mui/material";
import React from "react";

interface subHeaderProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export default function SubSection({ title, children }: subHeaderProps) {
  return (
    <Box sx={{ marginY: 1, paddingY: 1 }}>
      <Typography
        variant="h5"
        sx={{ marginY: 1, paddingY: 1 }}
        fontSize={16}
        fontWeight={500}
      >
        {title}
      </Typography>
      <Divider />
      {children}
    </Box>
  );
}

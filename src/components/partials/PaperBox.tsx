import React from "react";
import { Paper, Theme, Typography } from "@mui/material";

interface PaperBoxProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export default function PaperBox({ title, children }: PaperBoxProps) {
  return (
    <Paper
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: 2.5,
        borderRadius: 2.5,
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === "dark" ? "bgPrimary.dark" : "bgPrimary.light",
      }}
    >
      <Typography
        variant="h2"
        fontSize={18}
        fontWeight={500}
        sx={{
          color: (theme: Theme) =>
            theme.palette.mode === "dark"
              ? "textPrimary.dark"
              : "textPrimary.light",
          marginBottom: 1.5,
        }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

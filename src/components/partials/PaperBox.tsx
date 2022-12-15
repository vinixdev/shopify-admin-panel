import React from "react";
import { Paper, Stack, Theme, Typography, Box } from "@mui/material";
import FilterInput from "./FilterInput";

interface PaperBoxProps {
  title: string;
  minHeight?: number | string;
  children: JSX.Element | JSX.Element[];
  filter?: boolean;
  handler?: (value: string) => void;
}

export default function PaperBox({
  title,
  children,
  minHeight = "100%",
  filter = false,
  handler = (value) => null,
}: PaperBoxProps) {
  return (
    <Paper
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: minHeight,
        gap: 1,
        padding: 2.5,
        borderRadius: 2.5,
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === "dark" ? "bgPrimary.dark" : "bgPrimary.light",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} sx={{ marginBottom: 1.5 }}>
        <Typography
          variant="h2"
          fontSize={18}
          fontWeight={500}
          sx={{
            color: (theme: Theme) =>
              theme.palette.mode === "dark"
                ? "textPrimary.dark"
                : "textPrimary.light",
            // marginBottom: 1.5,
          }}
        >
          {title}
        </Typography>
        {filter ? (
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <FilterInput handler={handler} />
          </Box>
        ) : null}
      </Stack>
      {children}
    </Paper>
  );
}

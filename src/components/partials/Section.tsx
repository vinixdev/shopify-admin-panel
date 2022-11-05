import { Box, Divider, Paper, Stack, Typography, Theme } from "@mui/material";
import React from "react";
import AddButton from "../category/addButton/AddButton";

interface SectionBoxProps {
  header: string;
  btnTitle: string;
  children: JSX.Element;
  onClickHandler?: (e: React.MouseEvent) => void;
}

export default function Section({
  header,
  btnTitle,
  children,
  onClickHandler = () => null,
}: SectionBoxProps) {
  return (
    <Paper
      sx={{
        padding: 2,
        minHeight: (theme: Theme) => theme.spacing(23),
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.bgSecondary.dark
            : theme.palette.bgPrimary.light,
        "&:not(:first-of-type)": {
          marginY: 1,
        },
      }}
    >
      <Stack direction={"row"}>
        <Box>
          <Typography variant="h4" fontSize={18} fontWeight={500}>
            {header}
          </Typography>
        </Box>
        <Box marginLeft={"auto"}>
          <AddButton text={btnTitle} onClickHandler={onClickHandler} />
        </Box>
      </Stack>
      <Divider sx={{ width: "30%", marginY: 1.5 }} />
      {children}
    </Paper>
  );
}

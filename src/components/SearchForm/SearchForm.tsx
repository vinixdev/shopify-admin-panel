import React from "react";
import { IconButton, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import InputField from "./Input/InputField";

export default function SearchForm() {
  return (
    <Box
      component={"form"}
      sx={{
        width: "fit-content",
        display: "flex",
        marginLeft: "auto",
        marginRight: 5,
        backgroundColor: "transparent",
      }}
    >
      <InputField placeholder="جستجو" />
      <IconButton sx={{ backgroundColor: "transparent", marginLeft: "-50px" }}>
        <Search sx={{ color: "textSecondary.main" }} />
      </IconButton>
    </Box>
  );
}

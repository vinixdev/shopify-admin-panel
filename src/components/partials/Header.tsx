import React from "react";
import { Box } from "@mui/material";
import SearchForm from "../SearchForm/SearchForm";
import LanguageMenu from "../menu/LanguageMenu";
import Notification from "../notification/Notification";
import SwitchTheme from "../theme_switch/SwitchTheme";

export default function Header() {
  return (
    <Box
      component={"div"}
      display={"flex"}
      alignItems={"center"}
      gap={"20px"}
      sx={{ height: "100%", padding: "10px 20px" }}
    >
      {/* Switch Theme mode */}
      <SwitchTheme />

      {/* notification component */}
      <Notification />

      {/* Language Menu Component */}
      <LanguageMenu />

      {/* SearchForm Component */}

      <SearchForm />
    </Box>
  );
}

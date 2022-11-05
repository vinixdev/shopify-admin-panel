import React, { Dispatch } from "react";
import { IconButton } from "@mui/material";
import Brightness7RoundedIcon from "@mui/icons-material/Brightness7Rounded";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import { ThemeContext, ThemeContextInterface } from "./context/themeContext";
import { THEME_ACTION_TYPE } from "./reducer/SwitchThemeReducer";

export default function SwitchTheme() {
  const { mode, dispatch } =
    React.useContext<ThemeContextInterface>(ThemeContext);
  const iconStyles = {
    color: "textSecondary.main",
  };

  const handleOnClick = () => {
    const theme: "light" | "dark" = mode === "dark" ? "light" : "dark";
    // setMode(themeMode);
    dispatch({
      type: "SWITCH_THEME",
      payload: theme,
    });
  };

  return (
    <IconButton
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        heigh: "50px",
      }}
      onClick={handleOnClick}
    >
      {mode === "dark" ? (
        <Brightness7RoundedIcon fontSize="large" sx={iconStyles} />
      ) : (
        <Brightness4RoundedIcon fontSize="large" sx={iconStyles} />
      )}
    </IconButton>
  );
}

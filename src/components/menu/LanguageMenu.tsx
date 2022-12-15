import React from "react";
import { Box, Menu, MenuItem, Button } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export default function LanguageMenu() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLngEn = (e: React.MouseEvent) => {
    i18next.changeLanguage("en");
    setAnchorEl(null);
  };

  const handleLngFa = (e: React.MouseEvent) => {
    i18next.changeLanguage("fa");
    setAnchorEl(null);
  };

  return (
    <Box component={"div"}>
      <Button
        id={"menu-btn"}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "textSecondary.main",
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        {t("lng")}
        {open ? <ExpandLess /> : <ExpandMore />}
      </Button>

      <Menu
        id={"menu-container"}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "menu-btn",
        }}
      >
        <MenuItem sx={{ color: "textSecondary.main" }} onClick={handleLngFa}>
          {t("lngFa")}
        </MenuItem>
        <MenuItem sx={{ color: "textSecondary.main" }} onClick={handleLngEn}>
          {t("lngEn")}
        </MenuItem>
      </Menu>
    </Box>
  );
}

import React from "react";
import { Box, Menu, MenuItem, Button } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function LanguageMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
        فارسی
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
        <MenuItem sx={{ color: "textSecondary.main" }} onClick={handleClose}>
          انگلیسی
        </MenuItem>
      </Menu>
    </Box>
  );
}

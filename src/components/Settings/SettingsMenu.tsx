import React from "react";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AddchartRoundedIcon from "@mui/icons-material/AddchartRounded";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SettingsMenu() {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List component={"nav"} sx={{ width: "100%" }}>
      <ListItemButton sx={{ gap: "5px", padding: "5px" }} onClick={handleClick}>
        <ListItemIcon
          sx={{
            minWidth: "fit-content",
          }}
        >
          <SettingsRoundedIcon
            fontSize="medium"
            sx={{
              color: "textPrimary.main",
            }}
          />
        </ListItemIcon>
        <ListItemText
          disableTypography={true}
          sx={{ fontSize: "12px", minWidth: "fit-content" }}
          primary={t("setting_menu")}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={"/settings/new"}>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon
                sx={{
                  minWidth: "fit-content",
                }}
              >
                <SettingsApplicationsRoundedIcon
                  fontSize="small"
                  sx={{
                    color: "textPrimary.main",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                sx={{ fontSize: "11px", minWidth: "fit-content" }}
                primary={t("new_setting")}
              />
            </ListItemButton>
          </Link>
          <Link to={"/settings"}>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon
                sx={{
                  minWidth: "fit-content",
                }}
              >
                <SettingsApplicationsRoundedIcon
                  fontSize="small"
                  sx={{
                    color: "textPrimary.main",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                sx={{ fontSize: "11px", minWidth: "fit-content" }}
                primary={t("settings")}
              />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}

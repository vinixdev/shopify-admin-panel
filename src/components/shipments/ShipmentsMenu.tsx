import React from "react";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import TocRoundedIcon from "@mui/icons-material/TocRounded";
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

export default function ShipmentsMenu() {
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
          <LocalShippingRoundedIcon
            fontSize="medium"
            sx={{
              color: "textPrimary.main",
            }}
          />
        </ListItemIcon>
        <ListItemText
          disableTypography={true}
          sx={{ fontSize: "12px", minWidth: "fit-content" }}
          primary={t("shipment_menu")}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={"/shipments"}>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon
                sx={{
                  minWidth: "fit-content",
                }}
              >
                <TocRoundedIcon
                  fontSize="small"
                  sx={{
                    color: "textPrimary.main",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                sx={{ fontSize: "11px", minWidth: "fit-content" }}
                primary={t("shipments")}
              />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}

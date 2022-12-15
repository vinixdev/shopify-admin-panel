import React from "react";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import MoneyOffCsredRoundedIcon from "@mui/icons-material/MoneyOffCsredRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Badge,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function FinancialMenu() {
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
          <PaymentsRoundedIcon
            fontSize="medium"
            sx={{
              color: "textPrimary.main",
            }}
          />
        </ListItemIcon>
        <ListItemText
          disableTypography={true}
          sx={{ fontSize: "12px", minWidth: "fit-content" }}
          primary={t("financial_menu")}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={"/payments"}>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon
                sx={{
                  minWidth: "fit-content",
                }}
              >
                <CreditCardRoundedIcon
                  fontSize="small"
                  sx={{
                    color: "textPrimary.main",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                sx={{ fontSize: "11px", minWidth: "fit-content" }}
                primary={t("payments")}
              />
            </ListItemButton>
          </Link>
          <Link to={"/coupons/new"}>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon
                sx={{
                  minWidth: "fit-content",
                }}
              >
                <LocalOfferRoundedIcon
                  fontSize="small"
                  sx={{
                    color: "textPrimary.main",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                sx={{ fontSize: "11px", minWidth: "fit-content" }}
                primary={t("new_coupon")}
              />
            </ListItemButton>
          </Link>
          <Link to={"/coupons"}>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon
                sx={{
                  minWidth: "fit-content",
                }}
              >
                <MoneyOffCsredRoundedIcon
                  fontSize="small"
                  sx={{
                    color: "textPrimary.main",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                sx={{ fontSize: "11px", minWidth: "fit-content" }}
                primary={t("coupons")}
              />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}

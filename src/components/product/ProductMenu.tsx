import React from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TocRoundedIcon from "@mui/icons-material/TocRounded";
import GroupWorkRoundedIcon from "@mui/icons-material/GroupWorkRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import RedeemRoundedIcon from "@mui/icons-material/RedeemRounded";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProductMenu() {
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
          <StoreRoundedIcon
            fontSize="medium"
            sx={{
              color: "textPrimary.main",
            }}
          />
        </ListItemIcon>
        <ListItemText
          disableTypography={true}
          sx={{ fontSize: "12px", minWidth: "fit-content" }}
          primary={t("product_menu")}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={"/products/edit"}>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon
                sx={{
                  minWidth: "fit-content",
                }}
              >
                <AddCircleRoundedIcon
                  fontSize="small"
                  sx={{
                    color: "textPrimary.main",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                sx={{ fontSize: "11px", minWidth: "fit-content" }}
                primary={t("new_product")}
              />
            </ListItemButton>
          </Link>
          <Link to="/products">
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
                primary={t("products")}
              />
            </ListItemButton>
          </Link>
          <Link to={"/categories"}>
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon
                sx={{
                  minWidth: "fit-content",
                }}
              >
                <GroupWorkRoundedIcon
                  fontSize="small"
                  sx={{
                    color: "textPrimary.main",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                sx={{ fontSize: "11px", minWidth: "fit-content" }}
                primary={t("categories")}
              />
            </ListItemButton>
          </Link>
          <Link to="/category/edit">
            <ListItemButton sx={{ gap: 0.5 }}>
              <ListItemIcon
                sx={{
                  minWidth: "fit-content",
                }}
              >
                <CategoryRoundedIcon
                  fontSize="small"
                  sx={{
                    color: "textPrimary.main",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                sx={{ fontSize: "11px", minWidth: "fit-content" }}
                primary={t("new_category")}
              />
            </ListItemButton>
          </Link>
          <ListItemButton sx={{ gap: 0.5 }}>
            <ListItemIcon
              sx={{
                minWidth: "fit-content",
              }}
            >
              <RedeemRoundedIcon
                fontSize="small"
                sx={{
                  color: "textPrimary.main",
                }}
              />
            </ListItemIcon>
            <ListItemText
              disableTypography={true}
              sx={{ fontSize: "11px", minWidth: "fit-content" }}
              primary={t("offers")}
            />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

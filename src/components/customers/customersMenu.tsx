import React from "react";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import TocRoundedIcon from "@mui/icons-material/TocRounded";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function CustomersMenu() {
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
          <PeopleOutlineRoundedIcon
            fontSize="medium"
            sx={{
              color: "textPrimary.main",
            }}
          />
        </ListItemIcon>
        <ListItemText
          disableTypography={true}
          sx={{ fontSize: "12px", minWidth: "fit-content" }}
          primary="مشتریان"
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
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
              primary="لیست کاربران"
            />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

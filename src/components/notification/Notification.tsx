import React from "react";
import { Badge, Box, IconButton } from "@mui/material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

export default function Notification() {
  return (
    <IconButton
      sx={{
        display: "flex",
        alignItems: "center",
        width: "50px",
        heigh: "50px",
      }}
    >
      <Badge
        sx={{
          alignSelf: "flex-start",
          marginTop: "10px",
          marginRight: "-10px",
        }}
        color="error"
        variant="dot"
        invisible={false}
      />
      <NotificationsRoundedIcon
        fontSize="large"
        sx={{
          color: "textSecondary.main",
          marginRight: "-10px",
        }}
      />
    </IconButton>
  );
}

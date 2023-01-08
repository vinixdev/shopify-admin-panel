import React, { useEffect, useState } from "react";
import { Badge, Box, IconButton } from "@mui/material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

export default function Notification() {
  const [notification, setNotification] = useState<string[]>([]);

  useEffect(() => {
    setNotification((prev) => [...prev, "firstNotif"]);
  }, []);

  const handleClickNotification = (e: React.MouseEvent) => {
    setNotification([]);
  };

  return (
    <IconButton
      sx={{
        display: "flex",
        alignItems: "center",
        width: "50px",
        heigh: "50px",
      }}
      onClick={handleClickNotification}
    >
      {notification.length ? (
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
      ) : null}
      <NotificationsRoundedIcon
        fontSize="large"
        sx={{
          color: "textSecondary.main",
          marginRight: notification.length ? "-10px" : "0",
        }}
      />
    </IconButton>
  );
}

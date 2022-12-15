import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Brand() {
  const { t } = useTranslation();
  return (
    <Link to="/">
      <Box
        component={"div"}
        display={"flex"}
        alignItems={"center"}
        gap={1}
        marginBottom={1}
      >
        <Box component={"img"} alt="shop" width={40} height={40} src={logo} />
        <Typography variant="h2" fontWeight={"600"} fontSize={16}>
          {t("brand")}
        </Typography>
      </Box>
    </Link>
  );
}

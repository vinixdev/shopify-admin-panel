import React, { useState } from "react";
import { IconButton, Box, Theme, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";
import InputField from "./Input/InputField";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SearchForm() {
  const { t } = useTranslation();
  const muiTheme: Theme = useTheme();

  const [search, setSearch] = useState<string>("");
  const data = {
    [String(t("new_product"))]: "/products/edit",
    [String(t("products"))]: "/products",
    [String(t("categories"))]: "/categories",
    [String(t("new_category"))]: "/category/edit",
    [String(t("orders"))]: "/orders",
    [String(t("payments"))]: "/payments",
    [String(t("coupons"))]: "/coupons",
    [String(t("new_coupon"))]: "/coupons/new",
    [String(t("shipments"))]: "/shipments",
    [String(t("users"))]: "/users",
    [String(t("comments"))]: "/comments",
    [String(t("settings"))]: "/settings",
    [String(t("new_setting"))]: "/settings/new",
  };

  function handleInputOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleClickLink(e: React.MouseEvent) {
    setSearch("");
  }

  return (
    <Box
      component={"form"}
      sx={{
        position: "relative",
        width: "fit-content",
        display: "flex",
        marginLeft: "auto",
        marginRight: 5,
        backgroundColor: "transparent",
      }}
    >
      <InputField
        placeholder={t("search")}
        value={search}
        onChangeHandler={handleInputOnChange}
      />
      <IconButton sx={{ backgroundColor: "transparent", marginLeft: "-50px" }}>
        <Search sx={{ color: "textSecondary.main" }} />
      </IconButton>
      {search ? (
        <Box
          sx={{
            position: "absolute",
            top: "95%",
            width: "100%",
            maxHeight: "250px",
            overflowY: "scroll",
            scrollbarWidth: "thin",
            backgroundColor: (theme: Theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.bgSecondary.dark
                : theme.palette.bgSecondary.light,
            zIndex: 999,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          {Object.keys(data)
            .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <Box
                sx={{
                  paddingY: 1.5,
                  paddingX: 2,
                  "&:not(:last-child)": {
                    borderBottom: "3px solid",
                    borderBottomColor: (theme: Theme) =>
                      theme.palette.mode === "dark"
                        ? theme.palette.bgPrimary.dark
                        : theme.palette.bgPrimary.light,
                  },
                }}
              >
                <Link
                  style={{
                    color:
                      muiTheme.palette.mode === "dark"
                        ? muiTheme.palette.textSecondary.dark
                        : muiTheme.palette.textSecondary.light,
                  }}
                  onClick={handleClickLink}
                  to={`${data[item]}`}
                >
                  {item}
                </Link>
              </Box>
            ))}
        </Box>
      ) : null}
    </Box>
  );
}

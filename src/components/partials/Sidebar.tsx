import React from "react";
import { Divider, Box } from "@mui/material";
import Brand from "../brand/Brand";
import CustomersMenu from "../customers/customersMenu";
import FinancialMenu from "../financial/FinancialMenu";
import OrderMenu from "../order/OrderMenu";
import ProductMenu from "../product/ProductMenu";
import ShipmentsMenu from "../shipments/ShipmentsMenu";
import FeedbacksMenu from "../feedbacks/FeedbacksMenu";
import SettingsMenu from "../Settings/SettingsMenu";

export default function Sidebar() {
  return (
    <Box
      component={"div"}
      sx={{
        padding: 1,
        background: "transparent",
        color: "textPrimary.main",
      }}
    >
      {/* Brand Component */}
      <Brand />
      <Divider sx={{ backgroundColor: "dividerBg.main" }} />
      <ProductMenu />
      <Divider sx={{ backgroundColor: "dividerBg.main" }} />
      <OrderMenu />
      <Divider sx={{ backgroundColor: "dividerBg.main" }} />
      <FinancialMenu />
      <Divider sx={{ backgroundColor: "dividerBg.main" }} />
      <ShipmentsMenu />
      <Divider sx={{ backgroundColor: "dividerBg.main" }} />
      <CustomersMenu />
      <Divider sx={{ backgroundColor: "dividerBg.main" }} />
      <FeedbacksMenu />
      <Divider sx={{ backgroundColor: "dividerBg.main" }} />
      <SettingsMenu />
    </Box>
  );
}

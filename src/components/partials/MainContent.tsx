import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import AllCategoriesContent from "../category/AllCategoriesContent";
import AddCategoryContent from "../category/AddCategoryContent";
import AllCustomers from "../customers/AllCustomers";
import AllComments from "../feedbacks/AllComments";
import AddNewCoupon from "../financial/AddNewCoupon";
import AllCoupons from "../financial/AllCoupons";
import AllPayments from "../financial/AllPayments";
import RootContent from "../Home/RootContent";
import AllOrders from "../order/AllOrders";
import OrderDetail from "../order/OrderDetail";
import AllProducts from "../product/AllProducts";
import EditProductContent from "../product/EditProductContent";
import AddSetting from "../Settings/AddSetting";
import AllSettings from "../Settings/AllSettings";
import AllShipments from "../shipments/AllShipments";
import Content from "./Content";

export default function MainContent() {
  const { t } = useTranslation();
  return (
    <Content>
      <Routes>
        <Route path="/" element={<RootContent />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/add" element={<EditProductContent />} />
        <Route
          path="/products/edit/:productID"
          element={<EditProductContent />}
        />
        <Route path="/orders" element={<AllOrders />} />
        <Route path="/orders/:orderID" element={<OrderDetail />} />
        <Route path="/category/add" element={<AddCategoryContent />}></Route>
        <Route
          path="/category/edit/:categoryID"
          element={<AddCategoryContent />}
        ></Route>
        <Route path="/categories" element={<AllCategoriesContent />}></Route>
        <Route path="/payments" element={<AllPayments />}></Route>
        <Route path="/coupons" element={<AllCoupons />}></Route>
        <Route path="/coupons/new" element={<AddNewCoupon />}></Route>
        <Route path="/shipments" element={<AllShipments />}></Route>
        <Route path="/users" element={<AllCustomers />}></Route>
        <Route path="/comments" element={<AllComments />}></Route>
        <Route path="/settings" element={<AllSettings />}></Route>
        <Route path="/settings/new" element={<AddSetting />}></Route>
        <Route path="*" element={<div>{t("404_error")}</div>}></Route>
      </Routes>
    </Content>
  );
}

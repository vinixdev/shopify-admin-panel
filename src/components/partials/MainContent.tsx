import React from "react";
import { Route, Routes } from "react-router-dom";
import AllCategoriesContent from "../category/AllCategoriesContent";
import EditCategoryContent from "../category/EditCategoryContent";
import RootContent from "../Home/RootContent";
import EditProductContent from "../product/EditProductContent";
import Content from "./Content";

export default function MainContent() {
  return (
    <Content>
      <Routes>
        <Route path="/" element={<RootContent />} />
        <Route
          path="/products"
          element={<div>هنوز چیزی پیاده سازی نشده</div>}
        />
        <Route path="/category/edit" element={<EditCategoryContent />}></Route>
        <Route path="/categories" element={<AllCategoriesContent />}></Route>
        <Route path="/products/edit" element={<EditProductContent />}></Route>
        <Route path="*" element={<div>صفحه موردنظر یافت نشد.</div>}></Route>
      </Routes>
    </Content>
  );
}

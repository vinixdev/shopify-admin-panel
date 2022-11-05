import React from "react";
import EditCategory from "./EditCategory";
import { CategoryProvider } from "./context/CategoryContext";

export default function CategoryContent() {
  return (
    <CategoryProvider>
      <EditCategory />
    </CategoryProvider>
  );
}

import React from "react";
import AddCategory from "./AddCategory";
import { CategoryProvider } from "./context/CategoryContext";

export default function CategoryContent() {
  return (
    <CategoryProvider>
      <AddCategory />
    </CategoryProvider>
  );
}

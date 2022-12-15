import React from "react";
import { EditProductProvider } from "./context/editProductContext";
import EditProduct from "./EditProduct";

export default function EditProductContent() {
  return (
    <EditProductProvider>
      <EditProduct />
    </EditProductProvider>
  );
}

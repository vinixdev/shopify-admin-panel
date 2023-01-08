import React from "react";
import { Divider } from "@mui/material";
import PaperBox from "../partials/PaperBox";
import InputField from "../SearchForm/Input/InputField";
import { ProductCategoryAtteributeGroup } from "./interfaces/interfaces";
import { useTranslation } from "react-i18next";
import { EditProductContext } from "./context/editProductContext";
import ProductGroupAtteribute from "./ProductGroupAtteribute";

// TODO: Create Variant For products like color or size and other ...

export default function ProductCategoryAtteributes({
  id,
  title,
  slug,
  attributes,
  handler,
}: ProductCategoryAtteributeGroup) {
  const { t } = useTranslation();

  return (
    <PaperBox title={title}>
      <Divider />
      <>
        {attributes.length ? (
          attributes.map((attr) => {
            return (
              <ProductGroupAtteribute
                handler={handler}
                key={attr.id}
                id={id}
                attr={attr}
                val={attr.value}
              />
            );
          })
        ) : (
          <div>{t("group_not_have_attrs")}</div>
        )}
      </>
    </PaperBox>
  );
}

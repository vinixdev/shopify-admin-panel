import React from "react";
import { Divider } from "@mui/material";
import PaperBox from "../partials/PaperBox";
import InputField from "../SearchForm/Input/InputField";
import { ProductCategoryAtteributeGroup } from "./interfaces/interfaces";

// TODO: Create Variant For products like color or size and other ...

export default function ProductCategoryAtteributes({
  id,
  title,
  slug,
  attributes,
  handler,
}: ProductCategoryAtteributeGroup) {
  return (
    <PaperBox title={title}>
      <Divider />
      <>
        {attributes.length ? (
          attributes.map((attr) => {
            return (
              <InputField
                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handler(e.target.value, id, attr.id)
                }
                placeholder={attr.title}
                key={attr.id}
              />
            );
          })
        ) : (
          <div>گروه مورد نظر هیچ پراپرتی ندارد.</div>
        )}
      </>
    </PaperBox>
  );
}

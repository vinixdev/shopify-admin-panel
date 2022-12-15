import React from "react";
import { Divider } from "@mui/material";
import PaperBox from "../partials/PaperBox";
import InputField from "../SearchForm/Input/InputField";
import { ProductCategoryAtteributeGroup } from "./interfaces/interfaces";
import { useTranslation } from "react-i18next";

// TODO: Create Variant For products like color or size and other ...

export default function ProductCategoryAtteributes({
  id,
  title,
  slug,
  attributes,
  handler,
}: ProductCategoryAtteributeGroup) {
  const { t } = useTranslation();

  const [value, setValue] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);

  return (
    <PaperBox title={title}>
      <Divider />
      <>
        {attributes.length ? (
          attributes.map((attr) => {
            return (
              <InputField
                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(e.target.value);
                  setError(false);
                  if (!e.target.value) {
                    setError(true);
                  }
                  if (e.target.value) {
                    handler(e.target.value, id, attr.id);
                  }
                }}
                placeholder={attr.title}
                key={attr.id}
                value={value}
                error={error}
                required
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

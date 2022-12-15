import { Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  EditProductContext,
  EditProductContextInterface,
} from "../context/editProductContext";
import { VariantPriceInterface } from "../reducer/editProductReducer";
import { VariantItemInterface } from "./EditVariant";

interface vpProps {
  vp: VariantPriceInterface;
}

export default function VariantPriceItem({ vp }: vpProps) {
  const { t } = useTranslation();

  const { state } =
    React.useContext<EditProductContextInterface>(EditProductContext);

  const items = vp.variants.map((selectedVariant) => {
    return state.variants
      .find((v) => v.hash === selectedVariant.variant)
      ?.items.find((item) => item.hash === selectedVariant.item);
  });

  console.log(items);

  return (
    <Stack direction={"row"} gap={1} padding={0.5}>
      <Typography
        variant="h6"
        fontSize={14}
        fontWeight={500}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {items.length
          ? items
              .map((item: any, index) => {
                if (item) {
                  return <span key={index}>{item.title}</span>;
                }
              })
              .reverse()
          : ""}
        <span>
          {t("price")} : {vp.price} ریال
        </span>
        &nbsp;
        <span>
          {t("stock_num")} : {vp.inventory} {t("num")}
        </span>
      </Typography>
    </Stack>
  );
}

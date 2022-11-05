import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import ModalForm from "../../category/modal/ModalForm";
import InputField from "../../SearchForm/Input/InputField";
import { VariantInterface } from "../reducer/editProductReducer";

interface EditVariantProps {
  onSubmitHandler: (variant: any) => void;
  onCloseHandler: (e: React.MouseEvent) => void;
  open: boolean;
}

export default function EditVariant({
  open = false,
  onSubmitHandler,
  onCloseHandler,
}: EditVariantProps) {
  //
  const [variantType, setVariantType] = React.useState<string>("dropdown");
  const [variantTitle, setVariantTitle] = React.useState<string>("");
  const [variantSlug, setVariantSlug] = React.useState<string>("");
  const [variantValue, setVariantValue] = React.useState<string>("");

  function handleSubmitModal(e: React.MouseEvent) {
    onSubmitHandler({
      title: variantTitle,
      slug: variantSlug,
      type: variantType,
      value: variantValue,
    });
  }

  return (
    <ModalForm
      title="ایجاد متغیر محصول جدید"
      open={open}
      onCloseHandler={onCloseHandler}
      onSubmitHandler={handleSubmitModal}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <>
        <FormControl>
          <InputField
            onBlurHandler={(e: React.FocusEvent<HTMLInputElement>) =>
              setVariantTitle(e.target.value)
            }
            placeholder="عنوان متغیر - فارسی"
          />
        </FormControl>

        {variantType === "color" ? (
          <FormControl sx={{ alignSelf: "flex-start" }}>
            <InputField
              onBlurHandler={(e: React.FocusEvent<HTMLInputElement>) =>
                setVariantValue(e.target.value)
              }
              type={"color"}
              placeholder="مقدار متغیر"
            />
          </FormControl>
        ) : (
          <FormControl>
            <InputField
              onBlurHandler={(e: React.FocusEvent<HTMLInputElement>) =>
                setVariantValue(e.target.value)
              }
              type="text"
              placeholder="مقدار متغیر"
            />
          </FormControl>
        )}

        <FormControl>
          <InputField
            onBlurHandler={(e: React.FocusEvent<HTMLInputElement>) =>
              setVariantSlug(e.target.value)
            }
            placeholder="اسلاگ متغیر - انگلیسی"
          />
        </FormControl>

        <FormControl sx={{ alignSelf: "flex-start" }}>
          <FormLabel id="variant-type">انتخاب نوع متغیر</FormLabel>
          <RadioGroup
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setVariantType(e.target.value)
            }
            value={variantType}
            aria-labelledby="variant-type"
          >
            <FormControlLabel label="رنگ" value={"color"} control={<Radio />} />
            <FormControlLabel
              label="لیست کشویی"
              value={"dropdown"}
              control={<Radio />}
            />
          </RadioGroup>
        </FormControl>
      </>
    </ModalForm>
  );
}

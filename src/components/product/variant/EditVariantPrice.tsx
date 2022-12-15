import { FormControl, NativeSelect } from "@mui/material";
import React from "react";
import ModalForm from "../../category/modal/ModalForm";
import InputField from "../../SearchForm/Input/InputField";
import {
  selectedVariantsInterface,
  VariantInterface,
} from "../reducer/editProductReducer";
import InputSelectCustomize from "../Select/SelectInput";
import Alert from "../../alert/Alert";
import {
  alertInitialState,
  alertReducer,
} from "../../alert/reducer/alertReducer";
import {
  emptyValidation,
  numberValidation,
  zeroValidation,
} from "../validation/validation";
import { useTranslation } from "react-i18next";

export interface VariantPrice {
  price: number;
  inventory: number;
  variants: selectedVariantsInterface[];
}

interface EditVariantPriceProps {
  variants: VariantInterface[];
  open: boolean;
  onSubmitHandler: (variantPrice: VariantPrice) => void;
  onCloseHandler: (e: React.MouseEvent) => void;
}

export default function EditVariantPrice({
  open = false,
  variants,
  onSubmitHandler,
  onCloseHandler,
}: EditVariantPriceProps) {
  //

  const { t } = useTranslation();

  const [selects, setSelects] = React.useState<selectedVariantsInterface[]>([]);
  const [price, setPrice] = React.useState<string>("");
  const [inventory, setInventory] = React.useState<string>("");

  const [formErrors, setFormErrors] = React.useState<Map<string, boolean>>(
    new Map<string, boolean>()
  );

  const [alertState, alertDispatch] = React.useReducer(
    alertReducer,
    alertInitialState
  );

  function handleCloseAlert() {
    alertDispatch({
      type: "ALERT_CLOSE",
      payload: null,
    });
  }

  function handleSubmitModal(e: React.MouseEvent) {
    if (formErrors.size || !price || !inventory) {
      alertDispatch({
        type: "ALERT_ERROR",
        payload: t("fill_fields_error"),
      });
      if (!price) {
        setFormErrors(formErrors.set("price", true));
      }
      if (!inventory) {
        setFormErrors(formErrors.set("inventory", true));
      }
      return;
    }

    console.log({
      price: Number(price),
      inventory: Number(inventory),
      variants: selects,
    });

    onSubmitHandler({
      price: Number(price),
      inventory: Number(inventory),
      variants: selects,
    });

    setSelects([]);
    setPrice("");
    setInventory("");
  }

  function handleSelectInputs(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value) {
      setSelects((prev) => {
        return [
          ...prev,
          {
            variant: e.target.id,
            item: e.target.value,
          },
        ];
      });
    }
  }

  return (
    <>
      <ModalForm
        title={t("add_price_variant")}
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
          {variants.length
            ? variants
                .map((variant) => {
                  return (
                    <FormControl key={variant.hash}>
                      <NativeSelect
                        name={variant.slug}
                        id={variant.hash}
                        onChange={handleSelectInputs}
                        input={<InputSelectCustomize />}
                      >
                        <option value="">{`${t("choose")} ${
                          variant.title
                        }`}</option>
                        {variant.items.length
                          ? variant.items.map((item) => {
                              return (
                                <option value={item.hash} key={item.hash}>
                                  {item.title}
                                </option>
                              );
                            })
                          : null}
                      </NativeSelect>
                    </FormControl>
                  );
                })
                .reverse()
            : null}
          <FormControl>
            <InputField
              placeholder={t("price")}
              onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
                const isEmpty = emptyValidation(e.target.value);
                const isNumber = numberValidation(
                  e.target.value,
                  alertDispatch
                );
                const isZero = zeroValidation(e.target.value, alertDispatch);
                if (isEmpty || isZero || !isNumber) {
                  setFormErrors(formErrors.set(e.target.name, true));
                  setPrice("");
                  return;
                }
                formErrors.delete(e.target.name);
                setFormErrors(formErrors);
                setPrice(e.target.value);
              }}
              name="price"
              value={price}
              error={formErrors.has("price")}
            />
          </FormControl>
          <FormControl>
            <InputField
              placeholder={t("stock")}
              required
              onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
                const isEmpty = emptyValidation(e.target.value);
                const isNumber = numberValidation(
                  e.target.value,
                  alertDispatch
                );
                const isZero = zeroValidation(e.target.value, alertDispatch);
                if (isEmpty || isZero || !isNumber) {
                  setFormErrors(formErrors.set(e.target.name, true));
                  setInventory("");
                  return;
                }
                formErrors.delete(e.target.name);
                setFormErrors(formErrors);
                setInventory(e.target.value);
              }}
              value={inventory}
              name="inventory"
              error={formErrors.has("inventory")}
            />
          </FormControl>
        </>
      </ModalForm>
      <Alert
        type={alertState.type}
        message={alertState.message}
        open={alertState.open}
        handleClose={handleCloseAlert}
      />
    </>
  );
}

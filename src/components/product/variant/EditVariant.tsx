import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Alert from "../../alert/Alert";
import {
  alertInitialState,
  alertReducer,
} from "../../alert/reducer/alertReducer";
import ModalForm from "../../category/modal/ModalForm";
import InputField from "../../SearchForm/Input/InputField";
import { emptyValidation } from "../validation/validation";
import { useTranslation } from "react-i18next";

export interface VariantItemInterface {
  title: string;
  type: string;
  slug: string;
}

interface EditVariantProps {
  onSubmitHandler: (variant: VariantItemInterface) => void;
  onCloseHandler: (e: React.MouseEvent) => void;
  open: boolean;
}

export default function EditVariant({
  open = false,
  onSubmitHandler,
  onCloseHandler,
}: EditVariantProps) {
  //

  const { t } = useTranslation();

  const [variantType, setVariantType] = React.useState<string>("color");
  const [variantTitle, setVariantTitle] = React.useState<string>("");
  const [variantSlug, setVariantSlug] = React.useState<string>("");

  const [formErrors, setFormErrors] = React.useState<Map<string, boolean>>(
    new Map<string, boolean>()
  );

  const [alertState, alertDispatch] = React.useReducer(
    alertReducer,
    alertInitialState
  );

  function handleSubmitModal(e: React.MouseEvent) {
    if (formErrors.size || !variantTitle || !variantSlug) {
      alertDispatch({
        type: "ALERT_ERROR",
        payload: t("fill_fields_error"),
      });
      if (!variantTitle) {
        setFormErrors(formErrors.set("variantTitle", true));
      }
      if (!variantSlug) {
        setFormErrors(formErrors.set("variantSlug", true));
      }
      return;
    }
    onSubmitHandler({
      title: variantTitle,
      slug: variantSlug,
      type: variantType,
    });
    setVariantTitle("");
    setVariantSlug("");
    setVariantType("color");
  }

  function handleCloseAlert() {
    alertDispatch({
      type: "ALERT_CLOSE",
      payload: null,
    });
  }

  return (
    <>
      <ModalForm
        title={t("add_variant")}
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
              onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
                const isEmpty = emptyValidation(e.target.value);
                if (isEmpty) {
                  setFormErrors(formErrors.set(e.target.name, true));
                  setVariantTitle("");
                  return;
                }
                formErrors.delete(e.target.name);
                setFormErrors(formErrors);
                setVariantTitle(e.target.value);
              }}
              value={variantTitle}
              required
              placeholder={t("title")}
              name="variantTitle"
              error={formErrors.has("variantTitle")}
            />
          </FormControl>

          <FormControl>
            <InputField
              onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
                const isEmpty = emptyValidation(e.target.value);
                if (isEmpty) {
                  setFormErrors(formErrors.set(e.target.name, true));
                  setVariantSlug("");
                  return;
                }
                formErrors.delete(e.target.name);
                setFormErrors(formErrors);
                setVariantSlug(e.target.value);
              }}
              required
              placeholder={t("slug")}
              value={variantSlug}
              name="variantSlug"
              error={formErrors.has("variantSlug")}
            />
          </FormControl>

          <FormControl sx={{ alignSelf: "flex-start" }}>
            <FormLabel id="variant-type">{t("type")}</FormLabel>
            <RadioGroup
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setVariantType(e.target.value);
              }}
              value={variantType}
              aria-labelledby="variant-type"
            >
              <FormControlLabel
                label={t("color")}
                value={"color"}
                control={<Radio />}
              />
              <FormControlLabel
                label={t("dropdown")}
                value={"dropdown"}
                control={<Radio />}
              />
            </RadioGroup>
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

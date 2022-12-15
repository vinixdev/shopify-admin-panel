import React from "react";
import { ALERT_ACTION_TYPE } from "../../alert/reducer/alertReducer";

export function emptyValidation(value: string) {
  if (value) {
    return false;
  }
  return true;
}

export function zeroValidation(
  value: string,
  alertDispatch: React.Dispatch<ALERT_ACTION_TYPE>
) {
  if (value === "0") {
    alertDispatch({
      type: "ALERT_ERROR",
      payload: "نمیتواند صفر باشد.",
    });
    return true;
  }
  return false;
}

export function numberValidation(
  value: string,
  alertDispatch: React.Dispatch<ALERT_ACTION_TYPE>
) {
  if (value && value !== "0" && !Number(value)) {
    alertDispatch({
      type: "ALERT_ERROR",
      payload: "مقدار عددی وارد کنید.",
    });
    return false;
  }
  return true;
}

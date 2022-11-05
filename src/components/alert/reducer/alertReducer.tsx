import { useReducer } from "react";

export interface AlertStateInterface {
  open: boolean;
  message?: string;
  type: "error" | "info" | "success" | "warning";
}

export const alertInitialState: AlertStateInterface = {
  open: false,
  type: "success",
  message: "",
};

type ALERT_ACTION_TYPE = {
  type: string;
  payload: any;
};

export const alertReducer = (
  state: AlertStateInterface,
  action: ALERT_ACTION_TYPE
): AlertStateInterface => {
  switch (action.type) {
    case "ALERT_ERROR":
      return {
        ...state,
        type: "error",
        message: action.payload,
        open: true,
      };

    case "ALERT_SUCCESS":
      return {
        ...state,
        type: "success",
        message: action.payload,
        open: true,
      };

    case "ALERT_CLOSE":
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

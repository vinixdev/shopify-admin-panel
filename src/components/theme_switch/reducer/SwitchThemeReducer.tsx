import { useReducer } from "react";

export interface ThemeStateInterface {
  mode: "light" | "dark";
}

export const initialState: ThemeStateInterface = {
  mode: "dark",
};

export type THEME_ACTION_TYPE = {
  type: "SWITCH_THEME";
  payload: "light" | "dark";
};

export function reducer(
  state: ThemeStateInterface = initialState,
  action: THEME_ACTION_TYPE
): ThemeStateInterface {
  switch (action.type) {
    case "SWITCH_THEME":
      const { payload: mode } = action;
      return { ...state, mode };
    default:
      return state;
  }
}

import React, { Dispatch } from "react";
import {
  THEME_ACTION_TYPE,
  initialState,
  reducer,
} from "../reducer/SwitchThemeReducer";

export interface ThemeContextInterface {
  mode: "light" | "dark";
  dispatch: Dispatch<THEME_ACTION_TYPE>;
}

export const ThemeContext = React.createContext<ThemeContextInterface>({
  mode: "dark",
  dispatch: () => null,
});

interface ThemeContextProviderInterface {
  children: JSX.Element;
}

export function ThemeContextProvider(props: ThemeContextProviderInterface) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <ThemeContext.Provider value={{ mode: state.mode, dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

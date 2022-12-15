import React, { Dispatch } from "react";
import {
  editProductReducer,
  EditProductStateInterface,
  initialState,
  EDIT_PRODUCT_ACTION_TYPE,
} from "../reducer/editProductReducer";

export interface EditProductContextInterface {
  state: EditProductStateInterface;
  dispatch: Dispatch<EDIT_PRODUCT_ACTION_TYPE>;
}

export const EditProductContext =
  React.createContext<EditProductContextInterface>(
    {} as EditProductContextInterface
  );

export const EditProductProvider: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(editProductReducer, initialState);
  return (
    <EditProductContext.Provider value={{ state, dispatch }}>
      {children}
    </EditProductContext.Provider>
  );
};

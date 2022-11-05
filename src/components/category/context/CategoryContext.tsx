import React, { Dispatch } from "react";
import {
  CATEGORTY_ACTION_TYPES,
  categoryReducer,
  CategoryStateInterface,
  initialState,
} from "./CategoryReducer";

export interface CategoryContextInterface {
  state: CategoryStateInterface;
  dispatch: Dispatch<CATEGORTY_ACTION_TYPES>;
}

export const CategoryContext = React.createContext<CategoryContextInterface>(
  {} as CategoryContextInterface
);

export const CategoryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(categoryReducer, initialState);

  return (
    <CategoryContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};

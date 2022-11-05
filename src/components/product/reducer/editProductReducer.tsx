import React from "react";
import { CategoriesInterface, ProductCategory } from "../interfaces/interfaces";

export interface VariantInterface {
  id: string;
  title: string;
  slug: string;
  value: string;
}

export interface EditProductStateInterface {
  categories: CategoriesInterface[];
  selectedCategory: ProductCategory | null;
  thumbnail: File | null;
  gallery: File[];
  variants: VariantInterface[];
}

export const initialState: EditProductStateInterface = {
  categories: [],
  selectedCategory: null,
  thumbnail: null,
  gallery: [],
  variants: [],
};

type ACTION_TYPE = {
  type: string;
  payload: any;
};

export const editProductReducer = (
  state: EditProductStateInterface = initialState,
  action: ACTION_TYPE
): EditProductStateInterface => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "SET_SELECTED_CATEGORIES":
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case "SET_THUMBNAIL":
      return {
        ...state,
        thumbnail: action.payload,
      };
    case "ADD_ITEM_TO_GALLERY":
      return {
        ...state,
        gallery: [...state.gallery, action.payload],
      };
    case "UPDATE_ATTRIBUTE_VALUE":
      if (state.selectedCategory) {
        return {
          ...state,
          selectedCategory: {
            ...state.selectedCategory,
            groups: state.selectedCategory.groups.map((group) => {
              if (group.id === action.payload.groupId) {
                group.attributes.map((attr) => {
                  if (attr.id === action.payload.attrId) {
                    attr.value = action.payload.value;
                  }
                  return attr;
                });
              }
              return group;
            }),
          },
        };
      }
      return state;
    default:
      return state;
  }
  return state;
};

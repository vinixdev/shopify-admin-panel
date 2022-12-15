import React from "react";
import { v4 as uuidv4 } from "uuid";
import { CategoriesInterface, ProductCategory } from "../interfaces/interfaces";

export interface VariantItemInterface {
  hash: string;
  title: string;
  value: string;
}

export interface VariantInterface {
  hash: string;
  title: string;
  slug: string;
  type: string;
  items: VariantItemInterface[];
}

export interface selectedVariantsInterface {
  variant: string;
  item: string;
}

export interface VariantPriceInterface {
  hash: string;
  variants: selectedVariantsInterface[];
  price: number;
  inventory: number;
}

// {id:string, variants:[{variant: id, item: item-id}], price: 2000, inventory: 5}

export interface EditProductStateInterface {
  categories: CategoriesInterface[];
  selectedCategory: ProductCategory | null;
  thumbnail: File | null;
  gallery: File[];
  variants: VariantInterface[];
  variantsPrice: VariantPriceInterface[];
}

export const initialState: EditProductStateInterface = {
  categories: [],
  selectedCategory: null,
  thumbnail: null,
  gallery: [],
  variants: [],
  variantsPrice: [],
};

export type EDIT_PRODUCT_ACTION_TYPE = {
  type: string;
  payload: any;
};

export const editProductReducer = (
  state: EditProductStateInterface = initialState,
  action: EDIT_PRODUCT_ACTION_TYPE
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
    case "ADD_VARIANT":
      console.log(action.payload);
      const newState = {
        ...state,
        variants: [
          {
            hash: uuidv4(),
            title: action.payload.title,
            slug: action.payload.slug,
            type: action.payload.type,
            items: [],
          },
          ...state.variants,
        ],
      };
      console.log(newState);
      return newState;
    case "ADD_VARIANT_ITEM":
      console.log(action.payload);
      const newState2 = {
        ...state,
        variants: state.variants.map((variant) => {
          if (variant.hash === action.payload.variantId) {
            variant.items = [
              ...variant.items,
              {
                hash: uuidv4(),
                title: action.payload.title,
                value: action.payload.value,
              },
            ];
          }
          return variant;
        }),
      };
      console.log(newState2);
      return newState2;
    case "ADD_VARIANT_PRICE":
      return {
        ...state,
        variantsPrice: [
          ...state.variantsPrice,
          {
            hash: uuidv4(),
            price: action.payload.price,
            inventory: action.payload.inventory,
            variants: action.payload.variants,
          },
        ],
      };
    default:
      return state;
  }
  return state;
};

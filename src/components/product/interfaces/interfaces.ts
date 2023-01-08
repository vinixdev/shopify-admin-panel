import {
  AttributeGroupInterface,
  AttributeInterface,
  CategoryStateInterface,
} from "../../category/context/CategoryReducer";

export interface ProductCategory extends CategoryStateInterface {
  groups: ProductCategoryAtteributeGroup[];
}

export interface ProductCategoryAtteributeGroup
  extends AttributeGroupInterface {
  attributes: ProductCategoryAtteribute[];
  handler: (value: string, groupId: string, attrId: string) => void;
}

export interface ProductCategoryAtteribute extends AttributeInterface {
  value: string;
}

export interface CategoriesInterface {
  title: string;
  slug: string;
  id: string;
}

export interface AlertOptionInterface {
  message: string;
  type: "success" | "error";
  open: boolean;
}

export interface AllProductsInterface {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  status: number;
  updated_at: string;
  created_at: string;
  gallery: string[];
  stock: number;
}

export interface ProductsResponseInterface {
  products: AllProductsInterface[];
  perPage: number;
  totalProducts: number;
}

export interface CategoriesResponse {
  categories: CategoriesInterface[];
  totalCategories: number;
  perPage: number;
}

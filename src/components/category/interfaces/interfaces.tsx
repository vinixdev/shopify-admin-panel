import { CategoryStateInterface } from "../context/CategoryReducer";

export interface CategoriesResponseInterface {
  categories: CategoryStateInterface[];
  perPage: number;
  totalCategories: number;
}

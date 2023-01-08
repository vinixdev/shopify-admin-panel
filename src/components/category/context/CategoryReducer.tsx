import { v4 as uuidv4 } from "uuid";

export interface AttributeInterface {
  title: string;
  slug: string;
  filterable: false;
  hasPrice: false;
  id: string;
}

export interface AttributeGroupInterface {
  id: string;
  title: string;
  slug: string;
  attributes: AttributeInterface[];
}

export interface CategoryStateInterface {
  id: string;
  title: string;
  slug: string;
  groups: AttributeGroupInterface[];
}

export const initialState: CategoryStateInterface = {
  id: uuidv4(),
  title: "",
  slug: "",
  groups: [],
};

export type CATEGORTY_ACTION_TYPES = {
  type: string;
  payload: any;
};

export const categoryReducer = function (
  state: CategoryStateInterface = initialState,
  action: CATEGORTY_ACTION_TYPES
): CategoryStateInterface {
  switch (action.type) {
    case "ADD_NEW_CATEGORY_TITLE":
      return {
        ...state,
        title: action.payload.title,
      };
    case "ADD_NEW_CATEGORY_SLUG":
      return {
        ...state,
        slug: action.payload.slug,
      };
    case "ADD_NEW_ATTRIBUTE":
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.payload.id) {
            group.attributes = [
              ...group.attributes,
              {
                id: uuidv4(),
                title: action.payload.title,
                slug: action.payload.slug,
                filterable: action.payload.filterable,
                hasPrice: action.payload.hasPrice,
              },
            ];
          }
          return group;
        }),
      };
    case "ADD_NEW_GROUP":
      const { title, slug, attributes } = action.payload;
      if (!title || !slug) return initialState;
      return {
        ...state,
        groups: [
          ...state.groups,
          {
            title,
            slug,
            attributes,
            id: uuidv4(),
          },
        ],
      };
    case "REMOVE_GROUP":
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.payload.id),
      };
    case "REMOVE_ATTRIBUTE":
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.payload.groupPk) {
            group.attributes = group.attributes.filter(
              (attr) => attr.id !== action.payload.id
            );
          }
          return group;
        }),
      };

    case "UPDATE_ATTERIBUTE":
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.payload.groupPk) {
            group.attributes = group.attributes.map((attr) => {
              if (attr.id === action.payload.attrPk) {
                attr = {
                  ...attr,
                  [action.payload.name]: action.payload[action.payload.name],
                };
              }
              return attr;
            });
          }
          return group;
        }),
      };
    case "RESET_STATE":
      return {
        ...state,
        id: uuidv4(),
        title: "",
        slug: "",
        groups: [],
      };
    case "SET_CATEGORY":
      return action.payload;
    default:
      return state;
  }
};

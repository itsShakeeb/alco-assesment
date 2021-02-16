import {
  CATEGORY_LIST_ERROR,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_REQUEST,
} from "./CategoryActionType";

const categoryReducerInitialState = {
  loading: false,
  categoryData: [],
  error: "",
};
const categoryReducer = (state = categoryReducerInitialState, action) => {
  switch (action.type) {
    case CATEGORY_LIST_ERROR:
      return { ...state, loading: true, categoryData: [], error: "" };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryData: action.payload,
        error: "",
      };
    case CATEGORY_LIST_ERROR:
      return {
        ...state,
        loading: false,
        categoryData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default categoryReducer;

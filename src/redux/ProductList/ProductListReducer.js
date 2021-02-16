import {
  PRODUCT_LIST_ERROR,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
} from "./ProductListActionType";
const ProductListInitialState = {
  loading: false,
  productListData: [],
  error: "",
};
const productListReducer = (state = ProductListInitialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, productListData: [], error: "" };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        productListData: action.payload,
        error: "",
      };
    case PRODUCT_LIST_ERROR:
      return {
        ...state,
        loading: false,
        productListData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default productListReducer;

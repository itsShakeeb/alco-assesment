import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_REQUEST,
} from "./AddToCartActionType";

const addToCartInitialState = {
  loading: false,
  addToCartData: [],
  cartItemCount: 0,
  error: "",
};
const addToCartReducer = (state = addToCartInitialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
        addToCartData: [],
        error: "",
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: true,
        addToCartData: action.payload,
        error: "",
      };
    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        loading: true,
        addToCartData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default addToCartReducer;

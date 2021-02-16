import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_REQUEST,
} from "./AddToCartActionType";

const addToCartRequest = () => {
  return {
    type: ADD_TO_CART_REQUEST,
  };
};
const addToCartSuccess = (cartItem) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload: cartItem,
  };
};
const addToCartFailure = (error) => {
  return {
    type: ADD_TO_CART_FAILURE,
    payload: error,
  };
};

export const addToCart = (product) => {
  return (dispatch) => {
    dispatch(addToCartRequest);
    // const ItemToAdd = product;
    if (!product) {
      const errorMsg = "Error";
      dispatch(addToCartFailure(errorMsg));
    }
    let localcart = [];
    if (!localStorage.getItem("localcart")) {
      console.log("Data", product);
      localcart.push(product);
      localStorage.setItem("localcart", JSON.stringify(localcart));
      return;
    }
    localcart = JSON.parse(localStorage.getItem("localcart"));
    let cartIndex = localcart.findIndex((item) => item.id === product.id);
    if (cartIndex > -1) {
      alert("Already in your cart");
    } else {
      localcart.push(product);
      localStorage.setItem("localcart", JSON.stringify(localcart));
      console.log("Product has been added to your cart");
    }
    const allItemOfCart = JSON.parse(localStorage.getItem("localcart"));

    dispatch(addToCartSuccess(allItemOfCart));
  };
};

import axios from "axios";
import {
  PRODUCT_LIST_ERROR,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
} from "./ProductListActionType";

const productListRequest = () => {
  return {
    type: PRODUCT_LIST_REQUEST,
  };
};
const productListSuccess = (productListData) => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    payload: productListData,
  };
};
const productListError = (error) => {
  return {
    type: PRODUCT_LIST_ERROR,
    payload: error,
  };
};

export const getProductList = () => {
  return function (dispatch) {
    dispatch(productListRequest());

    axios
      .get(`https://fakestoreapi.com/products`)
      .then((res) => {
        const productData = res.data;
        console.log(res.data);
        dispatch(productListSuccess(productData));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(productListError(errorMsg));
      });
  };
};

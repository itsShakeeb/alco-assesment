import axios from "axios";
import {
  CATEGORY_LIST_ERROR,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_REQUEST,
} from "./CategoryActionType";

const categoryListRequest = () => {
  return {
    type: CATEGORY_LIST_REQUEST,
  };
};
const categoryListSuccess = (categoryListData) => {
  return {
    type: CATEGORY_LIST_SUCCESS,
    payload: categoryListData,
  };
};
const categoryListError = (error) => {
  return {
    type: CATEGORY_LIST_ERROR,
    payload: error,
  };
};

export const getCategory = () => {
  return function (dispatch) {
    dispatch(categoryListRequest());
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => {
        const categoryData = res.data;
        console.log(res.data);
        dispatch(categoryListSuccess(categoryData));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(categoryListError(errorMsg));
      });
  };
};

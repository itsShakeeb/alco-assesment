import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxLogger from "redux-logger";
import ReduxThunk from "redux-thunk";
import productListReducer from "./ProductList/ProductListReducer";
import categoryReducer from "./Category/CategoryReducer";
import addToCartReducer from "./AddToCart/AddToCartReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  categoryList: categoryReducer,
  addToCart: addToCartReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, ReduxLogger))
);
export const persistor = persistStore(store);

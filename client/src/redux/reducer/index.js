import { combineReducers } from "redux";
import productReducer from "./productReducer";
import imageReducer from "./imageReducer";
import categoryReducer from "./categoryReducer";
import sizeReducer from "./sizeReducer";
import colorReducer from "./colorReducer";
import variationReducer from "./variationReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  product: productReducer,
  image: imageReducer,
  category: categoryReducer,
  size: sizeReducer,
  color: colorReducer,
  variation: variationReducer,
  cart: cartReducer,
  auth: authReducer,
  user: userReducer,
});


export default rootReducer;
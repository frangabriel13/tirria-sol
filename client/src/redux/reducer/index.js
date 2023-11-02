import { combineReducers } from "redux";
import productReducer from "./productReducer";
import imageReducer from "./imageReducer";
import categoryReducer from "./categoryReducer";
import sizeReducer from "./sizeReducer";

const rootReducer = combineReducers({
  product: productReducer,
  image: imageReducer,
  category: categoryReducer,
  size: sizeReducer,
});


export default rootReducer;
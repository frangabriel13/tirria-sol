import { combineReducers } from "redux";
import productReducer from "./productReducer";
import imageReducer from "./imageReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  product: productReducer,
  image: imageReducer,
  category: categoryReducer,
});


export default rootReducer;
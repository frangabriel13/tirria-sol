import { combineReducers } from "redux";
import productReducer from "./productReducer";
import imageReducer from "./imageReducer";

const rootReducer = combineReducers({
  product: productReducer,
  image: imageReducer,
});


export default rootReducer;
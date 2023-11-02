const initialState = {
  sizes: [],
  allSizes: [],
};

const sizeReducer = (state = initialState, action) => {
  switch(action.type) {
    case "GET_SIZES":
      return {
        ...state,
        sizes: action.payload,
        allSizes: action.payload,
      };
    case "ADD_SIZE":
      return {
        ...state,
        sizes: [...state.sizes, action.payload],
      };
    case "UPDATE_SIZE":
      return {
        ...state,
        sizes: state.sizes.map((size) => size.id === action.payload.id ? action.payload : size),
      };
    case "DELETE_SIZE":
      return {
        ...state,
        sizes: state.sizes.filter((size) => size.id !== action.payload),
      };
    default:
      return state;
  }
};


export default sizeReducer;
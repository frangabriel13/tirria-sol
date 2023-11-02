const initialState = {
  colors: [],
  allColors: [],
};

const colorReducer = (state = initialState, action) => {
  switch(action.type) {
    case "GET_COLORS":
      return {
        ...state,
        colors: action.payload,
        allColors: action.payload,
      };
    case "ADD_COLOR":
      return {
        ...state,
        colors: [...state.colors, action.payload],
      };
    case "UPDATE_COLOR":
      return {
        ...state,
        colors: state.colors.map((color) => color.id === action.payload.id ? action.payload : color),
      };
    case "DELETE_COLOR":
      return {
        ...state,
        colors: state.colors.filter((color) => color.id !== action.payload),
      };
    default:
      return state;
  }
};


export default colorReducer;
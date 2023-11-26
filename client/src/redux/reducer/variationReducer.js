const initialState = {
  variations: [],
  allvariations: [],
};

function variationReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_VARIATIONS':
      return {
        ...state,
        variations: action.payload,
        allVariations: action.payload
      }
    case 'ADD_VARIATION':
      return {
        ...state,
      }
    case 'UPDATE_VARIATION':
      return {
        ...state,
        variations: state.variations.map((variation) => {
          if (variation.id === action.payload.variationId) {
            return {
              ...variation,
              stock: action.payload.newStock,
            };
          }
          return variation;
        }),
      };
    case 'DELETE_VARIATION':
      return {
        ...state,
      }
    case 'FILTER_VARIATIONS':
      const allVariations = state.allVariations;
      const variationFiltered = allVariations.filter((el) => el.productId === parseInt(action.payload));
      return {
        ...state,
        variations: variationFiltered,
      }
    default:
      return state;
  }
}


export default variationReducer;
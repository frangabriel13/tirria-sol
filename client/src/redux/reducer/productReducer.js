const initialState = {
  products: [],
  allProducts: [],
  productById: {},
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload
      }
    case 'GET_PRODUCT_BY_ID':
      return {
        ...state,
        productById: action.payload
      }
    case 'ADD_PRODUCT':
      return {
        ...state,
      }
    case 'UPDATE_PRODUCT':
      return {
        ...state,
      }
    case 'DELETE_PRODUCT':
      return {
        ...state,
      }
    default:
      return state;
  }
}


export default productReducer;
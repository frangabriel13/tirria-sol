const initialState = {
  categories: [],
  allCategories: [],
};

function categoryReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
        allCategories: action.payload
      };
    case 'CREATE_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(category => category.id === action.payload.id ? action.payload : category)
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload)
      };
    case 'FILTER_SUBCATEGORIES':
      const targetId = parseInt(action.payload, 10);

      if (targetId === 0) {
        return {
          ...state,
          categories: state.allCategories.filter(category => category.parents.length > 0),
        };
      } else {
        return {
          ...state,
          categories: state.allCategories.filter(category => 
            category.parents.some(parent => parent.id === targetId)
          ),
        };
      }
    default: 
      return state;
  }
}


export default categoryReducer;
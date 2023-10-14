const initialState = {
  images: [],
  // selectedImage: {},
  // loading: false,
  // error: null
};

function imageReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_IMAGES':
      return {
        ...state,
        images: action.payload
      };
    case 'CREATE_IMAGE':
      return {
        ...state,
        images: [...state.images, ...action.payload]
      };
    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter(image => image.id !== action.payload)
      };
    // case 'SET_LOADING':
    //   return {
    //     ...state,
    //     loading: action.payload
    //   };
    // case 'SET_ERROR':
    //   return {
    //     ...state,
    //     error: action.payload
    //   };
    // case 'SET_SELECTED_IMAGE':
    //   return {
    //     ...state,
    //     selectedImage: action.payload
    //   };
    default:
      return state;
  }
}


export default imageReducer;
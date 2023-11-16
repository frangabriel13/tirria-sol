const initialState = {
  users: [],
  allUsers: [],
  userById: {},
};

function userReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_USER':
      return {
        ...state,
      }
    default:
      return state;
  }
}


export default userReducer;
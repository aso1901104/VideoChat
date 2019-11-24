const initialState = {
  currentUser: null,
}

const authen = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload.currentUser,
      }
    default:
      return state;
  }
};

export default authen;

const initialState = {
  currentUser: null
}

const authen = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER': {
      const json = JSON.stringify(state.currentUser) // renderを走らせる為に記述
      let currentUser = JSON.parse(json)
      currentUser = action.payload.currentUser
      return {
        ...state,
        currentUser
      }
    }
    case 'REMOVE_CURRENT_USER':
      return {
        ...state,
        currentUser: null
      }
    default:
      return state
  }
}

export default authen

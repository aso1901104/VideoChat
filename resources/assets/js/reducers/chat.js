
const initialState = {
  isChatPage: false
}

const chat = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHAT_PAGE':
      return {
        ...state,
        isChatPage: action.payload.isChatPage
      }
    default:
      return state
  }
}

export default chat

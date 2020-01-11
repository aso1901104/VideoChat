import axios from 'axios'
export const setCurrentUser = () => {
  return dispatch => {
    axios.get('/getCurrentUser').then((res) => {
      dispatch({ type: 'SET_CURRENT_USER', payload: { currentUser: res.data.currentUser } })
    })
  }
}

export const removeCurrentUser = () => {
  return { type: 'REMOVE_CURRENT_USER' }
}

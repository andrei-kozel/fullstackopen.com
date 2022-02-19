const initialState = {
  user: null
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return state.blogs
    case 'LOGIN_USER':
      return { ...state, user: action.data }
    case 'LOGOUT_USER':
      return { ...state, user: null }
    default:
      return state
  }
}

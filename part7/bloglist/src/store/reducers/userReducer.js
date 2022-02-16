import loginService from '../../services/login'
import blogService from '../../services/blogs'

const initialState = {
  user: {}
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return state.blogs
    case 'LOGIN_USER':
      return { ...state, users: action.data }
    default:
      return state
  }
}

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN_USER',
      data: user
    })
  }
}

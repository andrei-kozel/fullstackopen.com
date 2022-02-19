import blogService from '../../services/blogs'
import loginService from '../../services/login'

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN_USER',
        data: user
      })
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { message: 'Logged in!', type: 'success' }
      })
    } catch (err) {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { message: err.response.data.error, type: 'danger' }
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }
}

export const loadUser = () => {
  return (dispatch) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        dispatch({
          type: 'LOGIN_USER',
          data: user
        })
        dispatch({
          type: 'SET_NOTIFICATION',
          data: { message: 'Welcome!', type: 'success' }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch({
      type: 'LOGOUT_USER',
      data: null
    })
  }
}

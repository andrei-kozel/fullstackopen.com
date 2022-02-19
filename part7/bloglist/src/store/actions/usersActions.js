import userService from '../../services/users'

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await userService.getAll()
      dispatch({
        type: 'FETCH_USERS',
        data: response
      })
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {
  users: []
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return state.blogs
    default:
      return state
  }
}

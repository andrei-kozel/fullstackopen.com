const initialState = {
  blogs: []
}

export const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BLOGS':
      return { ...state, blogs: action.data }
    case 'CREATE_BLOG':
      return { ...state, blogs: [...state.blogs, action.data] }
    case 'DELETE_BLOG':
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.data)
      }
    case 'LIKE_BLOG':
      return { ...state, blogs: action.data }
    default:
      return state
  }
}

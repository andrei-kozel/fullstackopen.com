import blogService from '../../services/blogs'

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

export const fetchBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll()
    dispatch({
      type: 'FETCH_BLOGS',
      data: response
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data: response
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    await blogService.update(id, blog)
    const response = await blogService.getAll()
    dispatch({
      type: 'LIKE_BLOG',
      data: response
    })
  }
}

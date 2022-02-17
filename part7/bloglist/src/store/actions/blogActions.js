import blogService from '../../services/blogs'

export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const response = await blogService.getAll()
      dispatch({
        type: 'FETCH_BLOGS',
        data: response
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    } catch (err) {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: err.response.data.error
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(blog)
      dispatch({
        type: 'CREATE_BLOG',
        data: response
      })
      dispatch({
        type: 'SET_NOTIFICATION',
        data: 'Blog was added!'
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    } catch (err) {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: err.response.data.error
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })
      dispatch({
        type: 'SET_NOTIFICATION',
        data: 'Blog was deleted!'
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    } catch (err) {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: err.response.data.error
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      let newLikes = blog.likes + 1
      const updatedPost = {
        user: blog.user.id,
        likes: newLikes,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      await blogService.update(blog.id, updatedPost)
      const response = await blogService.getAll()
      dispatch({
        type: 'LIKE_BLOG',
        data: response
      })
    } catch (err) {
      console.log(err)
    }
  }
}

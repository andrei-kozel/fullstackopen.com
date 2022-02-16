import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewPostForm from './components/NewPostForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import {
  createBlog,
  fetchBlogs,
  deleteBlog,
  likeBlog
} from './store/reducers/blogsReducer'
import { loginUser } from './store/reducers/userReducer'

const App = () => {
  const [notification] = useState(null)

  const blogs = useSelector((state) => state.blogsReducer.blogs)
  const user = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    dispatch(loginUser({ username, password }))
  }

  const handleCreateBlog = async (post) => {
    dispatch(createBlog(post))
  }

  const handleDeleteBlog = async (id) => {
    dispatch(deleteBlog(id))
  }

  const handleLike = async (blog) => {
    let newLikes = blog.likes + 1
    const updatedPost = {
      user: blog.user.id,
      likes: newLikes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    dispatch(likeBlog(blog.id, updatedPost))
  }

  return (
    <div>
      {notification ? notification : null}
      <h2>blogs</h2>
      {user === null ? (
        <Togglable buttonLabel="log in">
          <LoginForm handleSubmit={handleLogin} />
        </Togglable>
      ) : (
        <div>
          {user.name} logged
          <button type="submit" onClick={() => window.localStorage.clear()}>
            log out
          </button>
          <Togglable buttonLabel="create blog">
            <NewPostForm handleCreateNewPost={handleCreateBlog} />
          </Togglable>
        </div>
      )}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogService={blogService}
          handleDelete={handleDeleteBlog}
          handleLike={handleLike}
        />
      ))}
    </div>
  )
}

export default App

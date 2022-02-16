import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewPostForm from './components/NewPostForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  createBlog,
  fetchBlogs,
  deleteBlog,
  likeBlog
} from './store/reducers/blogsReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogsReducer.blogs)

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setNotification(`${user.name} welcome!`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification(exception.response.data.error)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
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

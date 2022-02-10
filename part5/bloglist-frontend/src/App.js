import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewPostForm from './components/NewPostForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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

  const handleCreateNewPost = async (post) => {
    try {
      await blogService.create(post)
      setNotification('post was added')
      const result = await blogService.getAll()
      setBlogs(result)
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

  const handleDelete = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setNotification('post was deleted')
      const result = await blogService.getAll()
      setBlogs(result)
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

  const handleLike = async (blog) => {
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
      const result = await blogService.getAll()
      setBlogs(result)
    } catch (exception) {
      setNotification(exception.response.data.error)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm handleSubmit={handleLogin} />
    </Togglable>
  )

  const newPostForm = () => (
    <Togglable buttonLabel="create blog">
      <NewPostForm handleCreateNewPost={handleCreateNewPost} />
    </Togglable>
  )

  return (
    <div>
      {notification ? notification : null}
      <h2>blogs</h2>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {user.name} logged
          <button type="submit" onClick={() => window.localStorage.clear()}>
            log out
          </button>
          {newPostForm()}
        </div>
      )}
      {blogs
        .sort((a, b) => a - b)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogService={blogService}
            handleDelete={handleDelete}
            handleLike={handleLike}
          />
        ))}
    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewPostForm from './components/NewPostForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const handleCreateNewPost = async (event) => {
    event.preventDefault()

    try {
      const post = {
        title,
        author,
        url
      }
      await blogService.create(post)
      setNotification(`post was added`)
      blogService.getAll().then((blogs) => setBlogs(blogs))
      setTitle('')
      setAuthor('')
      setUrl('')
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

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const newPostForm = () => (
    <Togglable buttonLabel="create blog">
      <NewPostForm
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        handleCreateNewPost={handleCreateNewPost}
      />
    </Togglable>
  )

  return (
    <div>
      {notification ?? notification}
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App

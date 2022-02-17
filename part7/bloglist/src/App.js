import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewPostForm from './components/NewPostForm'
import blogService from './services/blogs'
import {
  createBlog,
  fetchBlogs,
  deleteBlog,
  likeBlog
} from './store/actions/blogActions'
import { loginUser, loadUser, logoutUser } from './store/actions/userActions'

const App = () => {
  const notification = useSelector((state) => state.notificationReducer)
  const blogs = useSelector((state) => state.blogsReducer.blogs)
  const user = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(loadUser())
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
    dispatch(likeBlog(blog))
  }

  const handleLogOut = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      {notification ? notification : null}
      <h1>My blogs app</h1>
      {user === null ? (
        <LoginForm handleSubmit={handleLogin} />
      ) : (
        <div>
          {user.name} logged
          <Button variant="primary" type="submit" onClick={handleLogOut}>
            log out
          </Button>
          <NewPostForm handleCreateNewPost={handleCreateBlog} />
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

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import NewPostForm from './NewPostForm'
import blogService from '../services/blogs'
import { createBlog, fetchBlogs } from '../store/actions/blogActions'
import Notification from './Notification'
import { Col, Row } from 'react-bootstrap'

const Main = () => {
  const notification = useSelector((state) => state.notificationReducer)
  const blogs = useSelector((state) => state.blogsReducer.blogs)
  const user = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [])

  const handleCreateBlog = async (post) => {
    dispatch(createBlog(post))
  }

  return (
    <div>
      {notification && <Notification notification={notification} />}
      <Row className="align-items-center">
        <Col sm={10}>
          <h1>My blogs app</h1>
        </Col>
        <Col sm={2} className="d-flex justify-content-end">
          {user && (
            <div>
              <NewPostForm handleCreateNewPost={handleCreateBlog} />
            </div>
          )}
        </Col>
      </Row>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} blogService={blogService} />
      ))}
    </div>
  )
}

export default Main

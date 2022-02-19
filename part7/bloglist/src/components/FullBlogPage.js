import React, { useState } from 'react'
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteBlog,
  likeBlog,
  dislikeBlog,
  commentBlog
} from '../store/actions/blogActions'

const FullBlogPage = () => {
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const blog = useSelector((state) =>
    state.blogsReducer.blogs.find((blog) => blog.id === id)
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDeleteBlog = async () => {
    dispatch(deleteBlog(blog.id))
    return navigate('/')
  }

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const handleDislike = async () => {
    dispatch(dislikeBlog(blog))
  }

  const handleSubmitComment = async (event) => {
    event.preventDefault()
    setComment('')
    dispatch(commentBlog(id, comment))
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <a href={blog.url}>{blog.url}</a>
      <p>Likes: {blog.likes}</p>
      <p>Author: {blog.author}</p>
      <Button
        variant="outline-primary"
        size="sm"
        className="me-2"
        onClick={handleLike}>
        Like
      </Button>
      <Button
        variant="outline-danger"
        size="sm"
        className="me-2"
        onClick={handleDislike}>
        Dislike
      </Button>
      <Button variant="danger" size="sm" onClick={handleDeleteBlog}>
        Delete
      </Button>
      <h3 className="mt-4">Comments:</h3>
      <Row>
        <Col sm={12} md={6}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleSubmitComment}>
              Add comment
            </Button>
          </InputGroup>
        </Col>
      </Row>
      {blog.comments.length > 0 ? (
        <div>
          {blog.comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
        </div>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  )
}

export default FullBlogPage

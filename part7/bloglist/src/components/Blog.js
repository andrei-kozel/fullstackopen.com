import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

const Blog = ({ blog, handleDelete, handleLike }) => {
  const [visible, setyVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleVisibility = () => {
    setyVisible(!visible)
  }

  return (
    <div className="blog" style={blogStyle}>
      <Row>
        <Col xs={10} md={10}>
          {blog.title} {blog.author}
        </Col>
        <Col xs={2} md={2}>
          <Button onClick={handleVisibility}>
            {!visible ? 'view' : 'hide'}
          </Button>
        </Col>
      </Row>
      {!visible ? null : (
        <div>
          <div>url: {blog.url}</div>
          <div>
            likes: {blog.likes}{' '}
            <Button onClick={() => handleLike(blog)}>like</Button>
          </div>
          <div>{blog.author}</div>
          <Button variant="danger" onClick={() => handleDelete(blog.id)}>
            delete
          </Button>
        </div>
      )}
    </div>
  )
}

export default Blog

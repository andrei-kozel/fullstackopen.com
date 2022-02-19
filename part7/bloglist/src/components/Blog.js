import React from 'react'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div className="blog ">
      <Link
        to={`/blogs/${blog.id}`}
        state={blog}
        style={{ textDecoration: 'none' }}>
        <Alert variant="info" style={{ zIndex: '-1000' }}>
          {blog.title} {blog.author}
        </Alert>
      </Link>
    </div>
  )
}

export default Blog

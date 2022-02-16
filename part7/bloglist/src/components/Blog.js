import React, { useState } from 'react'

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
      <div>
        {blog.title} {blog.author}
        <button onClick={handleVisibility}>{!visible ? 'view' : 'hide'}</button>
      </div>
      {!visible ? null : (
        <div>
          <div>url: {blog.url}</div>
          <div>
            likes: {blog.likes}{' '}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.author}</div>
          <button onClick={() => handleDelete(blog.id)}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Blog

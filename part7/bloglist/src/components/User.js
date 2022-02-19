import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const User = () => {
  const user = useLocation().state

  return (
    <div>
      {!user ? (
        <h1>No user found</h1>
      ) : (
        <div>
          <h1>{user.name}</h1>
          <h3>Added blogs:</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`} state={blog}>
                  {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default User

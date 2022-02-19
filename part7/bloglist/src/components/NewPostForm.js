import React, { useState } from 'react'
import Togglable from './Togglable'

const NewPostForm = ({ handleCreateNewPost }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addPost = (event) => {
    event.preventDefault()
    handleCreateNewPost({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel="create blog">
      <div>
        <h2>Create new poost: </h2>
        <form onSubmit={addPost}>
          <div>
            title
            <input
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              id="url"
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button id="create" type="submit">
            add new post
          </button>
        </form>
      </div>
    </Togglable>
  )
}

export default NewPostForm

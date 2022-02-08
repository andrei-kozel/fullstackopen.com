import React from 'react'

const NewPostForm = ({
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleCreateNewPost
}) => {
  return (
    <div>
      <h2>Create new poost: </h2>
      <form onSubmit={handleCreateNewPost}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">add new post</button>
      </form>
    </div>
  )
}

export default NewPostForm

import React, { useState } from 'react'


const CreateBlog = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleFormCreateNew = async (event) => {
    event.preventDefault()
    createNewBlog(title, author, url)
    setAuthor('')
    setTitle('')
    setUrl('')

  }
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleFormCreateNew}>
        <div>
          Title:
          <input
            type="text"
            name="title"
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            name="author"
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            name="url"
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateBlog
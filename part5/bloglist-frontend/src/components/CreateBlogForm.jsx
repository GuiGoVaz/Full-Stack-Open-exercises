import { useState } from 'react'

const CreateBlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handler = async event => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      await handleCreateBlog(blogObject)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch {
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handler}>
        <div>
          <label>
            title:
            <input type="text" value={title} onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input type="text" value={url} onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default CreateBlogForm
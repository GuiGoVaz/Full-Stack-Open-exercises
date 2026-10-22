
import { useState } from 'react'
import blogService from '../services/blogs'





const CreateBlogForm = ({ setBlogs, blogs, setNotifMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async event => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotifMessage(`a new blog ${title} by ${author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
    catch {
      setNotifMessage('missing title or url')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
  }


  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
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
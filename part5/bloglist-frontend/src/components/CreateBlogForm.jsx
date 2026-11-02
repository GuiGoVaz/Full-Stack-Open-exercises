import { useState } from 'react'
import Notification from './Notification'
import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const CreateBlogForm = ({ handleCreateBlog, notifMessage, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

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
  if (!user) {
    navigate('/')
    return
  }
  return (
    <>
      <Notification message={notifMessage} />
      <h2>create new</h2>
      <form onSubmit={handler}>
        <TextField
          label="title:"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          sx={{ mb: 2 }}
        />
        <div>
          <TextField
            label="author:"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            label="url:"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            sx={{ mb: 1 }}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
            create
          </Button>
        </div>
      </form>
    </>
  )
}

export default CreateBlogForm
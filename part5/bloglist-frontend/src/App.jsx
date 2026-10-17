import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setNotifMessage(`wrong username or password`);
      setTimeout(() => {
        setNotifMessage(null);
      }, 5000);
      /* setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000) */
    }
  }

  const handleCreateBlog = async event => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    };
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotifMessage(`a new blog ${title} by ${author} added`);
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setNotifMessage(null);
      }, 5000);
    }
    catch {
      setNotifMessage(`missing title or url`);
      setTimeout(() => {
        setNotifMessage(null);
      }, 5000);
    }
  }



  const createBlogForm = () => (
    <><h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label>
            title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form></>
  )

  const loggedIn = () => {
    const logout = () => {
      window.localStorage.removeItem('loggedBlogappUser');
      setUser(null)
    }
    return (
      <p> {user.name} logged in <button onClick={logout} type="submit">
        logout
      </button></p>
    )
  }

  const blogForm = () => (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}</>
  )

  return (
    <div>

      {!user && (<LoginForm notifMessage={notifMessage} handleLogin={handleLogin} username={username}
        setUsername={setUsername} password={password} setPassword={setPassword} />)}
      {user && (
        <div><h2>blogs</h2>
          <Notification message={notifMessage} />
          {loggedIn()}
          {createBlogForm()}
          {blogForm()}
        </div>)}

    </div>
  )
}

export default App
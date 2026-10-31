import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
      setNotifMessage('wrong username or password')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
  }

  const handleBlogUpdate = (updatedBlog) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    )
  }
  const handleLike = async (blog) => {
    const updatedBlog = { ...blog }
    updatedBlog.likes = updatedBlog.likes + 1
    updatedBlog.user = updatedBlog.user.id
    const response = await blogService.update(blog.id, updatedBlog)
    handleBlogUpdate(response)
  }

  const handleBlogDelete = (idToDelete) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== idToDelete))
  }
  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id)
      handleBlogDelete(blog.id)
    }
  }

  const loggedIn = () => {
    const logout = () => {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }
    return (
      <p> {user.name} logged in <button onClick={logout} type="submit">
        logout
      </button></p>
    )
  }

  const blogForm = () => {
    blogs.sort((a, b) => b.likes - a.likes);
    return (
      <>
        {blogs.map(blog => {
          return (<Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} />)
        }
        )}</>
    )
  }



  const handleCreateBlog = async (blogObject) => {

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotifMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
    catch {
      setNotifMessage('missing title or url')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
      throw new Error("missing title or url");
    }
  }

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/login">login</Link>

      </div>

      <Routes>
        <Route path="/notes" element={
          <NoteList notes={notes} />
        } />
        <Route path="/create" element={
          <NoteForm createNote={addNote} />
        } />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>






  )
}

export default App
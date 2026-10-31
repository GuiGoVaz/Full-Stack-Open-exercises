import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogsPage from './components/BlogsPage'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Blog from "./components/Blog"
import CreateBlogForm from './components/CreateBlogForm'
import { useNavigate } from 'react-router-dom'


const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const padding = {
    padding: 5
  }
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const handleCreateBlog = async (blogObject) => {

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotifMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      navigate('/')
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
  return (
    <>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/create">new blog</Link>
        {!user && (<Link style={padding} to="/login">login</Link>)}
        {user && (<button onClick={logout}>
          logout
        </button>)}
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage user={user} setUser={setUser} />
        } />
        <Route path="/" element={<BlogsPage user={user} blogs={blogs} setBlogs={setBlogs} />} />
        <Route path="/create" element={
          <CreateBlogForm handleCreateBlog={handleCreateBlog} />
        } />
        <Route path="/blogs/:id" element={
          <Blog blog={blog} user={user} setUser={setUser} blogs={blogs} setBlogs={setBlogs} />
        } />
      </Routes>
    </>
  )
}

export default App
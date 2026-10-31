import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogsPage from './components/BlogsPage'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Blog from "./components/Blog"

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)
  const [blogs, setBlogs] = useState([])

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
  return (
    <>
      <div>
        <Link style={padding} to="/">blogs</Link>
        {!user && (<Link style={padding} to="/login">login</Link>)}
        {user && (<button onClick={logout}>
          logout
        </button>)}
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage user={user} setUser={setUser} />
        } />
        <Route path="/" element={<BlogsPage user={user} blogs={blogs} setBlogs={setBlogs} />} />

        <Route path="/blogs/:id" element={
          <Blog blog={blog} user={user} setUser={setUser} blogs={blogs} setBlogs={setBlogs} />
        } />
      </Routes>
    </>
  )
}

export default App
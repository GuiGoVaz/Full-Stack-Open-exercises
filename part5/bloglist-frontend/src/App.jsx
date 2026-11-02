import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogsPage from './components/BlogsPage'
import {
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Blog from "./components/Blog"
import CreateBlogForm from './components/CreateBlogForm'
import { useNavigate } from 'react-router-dom'
<<<<<<< HEAD


const App = () => {


=======
import { Container, AppBar, Toolbar, Button } from '@mui/material'

const App = () => {
>>>>>>> draft
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

<<<<<<< HEAD
  const padding = {
    padding: 5
  }
=======
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
  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }
>>>>>>> draft
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
<<<<<<< HEAD
      setNotifMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
=======
      setNotifMessage({ text: `a new blog ${blogObject.title} by ${blogObject.author} added`, type: 'success' })
>>>>>>> draft
      navigate('/')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
    catch {
<<<<<<< HEAD
      setNotifMessage('missing title or url')
=======
      setNotifMessage({ text: `missing title or url`, type: 'error' })
>>>>>>> draft
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
      throw new Error("missing title or url");
    }
  }
  return (
<<<<<<< HEAD
    <>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/create">new blog</Link>
        {!user && (<Link style={padding} to="/login">login</Link>)}
        {user && (<button onClick={logout}>
          logout
        </button>)}
      </div>
=======
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/" sx={style}>
            blogs
          </Button>
          {user && (<Button color="inherit" component={Link} to="/create" sx={style}>
            new blog
          </Button>)}
          {!user && (<Button color="inherit" component={Link} to="/login" sx={style}>
            login
          </Button>)}
          {user && (<Button color="inherit" onClick={logout}
            sx={style}>
            logout
          </Button>)}
        </Toolbar>
      </AppBar>

>>>>>>> draft
      <Routes>
        <Route path="/login" element={<LoginPage user={user} setUser={setUser} />
        } />
        <Route path="/" element={<BlogsPage user={user} blogs={blogs} setBlogs={setBlogs} notifMessage={notifMessage} setNotifMessage={setNotifMessage} />} />
        <Route path="/create" element={
<<<<<<< HEAD
          <CreateBlogForm handleCreateBlog={handleCreateBlog} />
        } />
        <Route path="/blogs/:id" element={
          <Blog blog={blog} user={user} setUser={setUser} blogs={blogs} setBlogs={setBlogs} />
        } />
      </Routes>
    </>
=======
          <CreateBlogForm handleCreateBlog={handleCreateBlog} notifMessage={notifMessage} user={user} />
        } />
        <Route path="/blogs/:id" element={
          <Blog blog={blog} user={user} setBlogs={setBlogs} />
        } />
      </Routes>
    </Container>
>>>>>>> draft
  )
}

export default App
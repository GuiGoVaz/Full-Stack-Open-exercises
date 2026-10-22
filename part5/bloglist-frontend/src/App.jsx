import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Toggable'




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
      setNotifMessage(`wrong username or password`);
      setTimeout(() => {
        setNotifMessage(null);
      }, 5000);
    }
  }

  const handleBlogUpdate = (updatedBlog) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    );
  };

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

  const blogForm = () => {

    return (
      <>
        {blogs.map(blog => {
          return (<Blog key={blog.id} blog={blog} user={user} handleBlogUpdate={handleBlogUpdate} />)
        }
        )}</>
    )
  }

  return (
    <div>
      {!user && (<div><LoginForm notifMessage={notifMessage} handleLogin={handleLogin} username={username}
        setUsername={setUsername} password={password} setPassword={setPassword} /> </div>)}
      {user && (
        <div><h2>blogs</h2>
          <Notification message={notifMessage} />
          {loggedIn()}
          <Togglable buttonLabel="create new blog" buttonLabel2="cancel">
            <CreateBlogForm setBlogs={setBlogs} blogs={blogs} setNotifMessage={setNotifMessage} />
          </Togglable>
          {blogForm()}
        </div>)}
    </div>
  )
}

export default App
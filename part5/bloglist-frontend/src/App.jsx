import { useState, useEffect } from 'react'
import blogService from './services/blogs'


import BlogsPage from './components/BlogsPage'


import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import LoginPage from './components/LoginPage'




const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)




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

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  return (
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        {!user && (<Link style={padding} to="/login">login</Link>)}
        {user && (<button onClick={logout}>
          logout
        </button>)}
      </div>

      <Routes>
        <Route path="/login" element={<LoginPage />

        } />
        <Route path="/" element={<BlogsPage />} />
      </Routes>

    </Router>






  )
}

export default App
import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogsPage from './components/BlogsPage'


import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'




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
        <Route path="/login" element={
          <div><LoginForm notifMessage={notifMessage} handleLogin={handleLogin} username={username}
            setUsername={setUsername} password={password} setPassword={setPassword} /> </div>
        } />
        <Route path="/" element={<BlogsPage />} />
      </Routes>

    </Router>






  )
}

export default App
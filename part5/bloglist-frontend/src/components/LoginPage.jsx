import Notification from "./Notification"
import Togglable from "./Togglable"
import CreateBlogForm from "./CreateBlogForm"
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from "./Blog"
import loginService from '../services/login'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'




const LoginPage = () => {
  const [notifMessage, setNotifMessage] = useState(null)
  const navigate = useNavigate()




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
      navigate('/')
    } catch {
      setNotifMessage('wrong username or password')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
  }




  //{loggedIn()}
  return (

    <div><LoginForm notifMessage={notifMessage} handleLogin={handleLogin} username={username}
      setUsername={setUsername} password={password} setPassword={setPassword} /> </div>

  )
}

export default LoginPage



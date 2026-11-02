<<<<<<< HEAD
import Notification from "./Notification"
import Togglable from "./Togglable"
import CreateBlogForm from "./CreateBlogForm"
import LoginForm from './LoginForm'
import blogService from '../services/blogs'
import Blog from "./Blog"
import loginService from '../services/login'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'




=======
import LoginForm from './LoginForm'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

>>>>>>> draft
const LoginPage = ({ user, setUser }) => {
  const [notifMessage, setNotifMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

<<<<<<< HEAD



=======
>>>>>>> draft
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
<<<<<<< HEAD
      setNotifMessage('wrong username or password')
=======
      setNotifMessage({ text: `wrong username or password`, type: 'error' })
>>>>>>> draft
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
  }

<<<<<<< HEAD



  //{loggedIn()}
  return (

    <div><LoginForm notifMessage={notifMessage} handleLogin={handleLogin} username={username}
      setUsername={setUsername} password={password} setPassword={setPassword} /> </div>

=======
  return (
    <div><LoginForm notifMessage={notifMessage} handleLogin={handleLogin} username={username}
      setUsername={setUsername} password={password} setPassword={setPassword} /> </div>
>>>>>>> draft
  )
}

export default LoginPage



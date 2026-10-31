import Notification from "./Notification"
import { useEffect } from 'react'
import blogService from '../services/blogs'
import BlogForm from "./BlogForm"





const BlogsPage = ({ user, blogs, setBlogs, notifMessage, setNotifMessage }) => {




  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])



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







  //{loggedIn()}
  return (

    <div><h2>blogs</h2>
      <Notification message={notifMessage} />
      <BlogForm blogs={blogs} />
    </div>

  )
}

export default BlogsPage



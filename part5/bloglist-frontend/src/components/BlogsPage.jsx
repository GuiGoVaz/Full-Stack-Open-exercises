import Notification from "./Notification"
import Togglable from "./Togglable"
import CreateBlogForm from "./CreateBlogForm"
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import BlogForm from "./BlogForm"





const BlogsPage = ({ user, blogs, setBlogs }) => {

  const [notifMessage, setNotifMessage] = useState(null)
  //const [user, setUser] = useState(null)

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



  //{loggedIn()}
  return (

    <div><h2>blogs</h2>
      <Notification message={notifMessage} />

      <Togglable buttonLabel="create new blog" buttonLabel2="cancel">
        <CreateBlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      <BlogForm />
    </div>

  )
}

export default BlogsPage



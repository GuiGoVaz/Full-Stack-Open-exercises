import Notification from "./Notification"
import Togglable from "./Togglable"
import CreateBlogForm from "./CreateBlogForm"
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from "./Blog"




const BlogsPage = ({ user }) => {
  const [blogs, setBlogs] = useState([])
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

  const blogForm = () => {
    blogs.sort((a, b) => b.likes - a.likes);
    return (


      <ul>
        {blogs.map(blog => {
          return (<li><Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} /></li>)
        }
        )}</ul>
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

  const handleBlogUpdate = (updatedBlog) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    )
  }
  const handleLike = async (blog) => {
    const updatedBlog = { ...blog }
    updatedBlog.likes = updatedBlog.likes + 1
    updatedBlog.user = updatedBlog.user.id
    const response = await blogService.update(blog.id, updatedBlog)
    handleBlogUpdate(response)
  }

  const handleBlogDelete = (idToDelete) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== idToDelete))
  }
  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id)
      handleBlogDelete(blog.id)
    }
  }
  //{loggedIn()}
  return (

    <div><h2>blogs</h2>
      <Notification message={notifMessage} />

      <Togglable buttonLabel="create new blog" buttonLabel2="cancel">
        <CreateBlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      {blogForm()}
    </div>

  )
}

export default BlogsPage



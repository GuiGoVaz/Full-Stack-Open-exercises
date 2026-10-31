import { useState, useEffect } from 'react'
import blogService from '../services/blogs'




const Blog = ({ blog, user, blogs, setBlogs }) => {

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
  if (!blog) {
    return null
  }
  return (

    <div><h2>{`${blog.author}: ${blog.title}`}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>
        like
      </button></div>

    </div>



  )
}

export default Blog



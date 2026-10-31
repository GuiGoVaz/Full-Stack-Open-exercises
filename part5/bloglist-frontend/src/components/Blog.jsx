import { useState } from 'react'
import { Link } from 'react-router-dom'



const Blog = ({ blog, user, }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)



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

  return (

    <div>
      <Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link>

      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
    </div>



  )
}

export default Blog



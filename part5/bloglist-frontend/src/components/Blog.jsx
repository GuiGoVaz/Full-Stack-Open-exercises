import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, user, handleBlogUpdate, handleBlogDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const handleLike = async (blog) => {
    const updatedBlog = { ...blog };
    updatedBlog.likes = updatedBlog.likes + 1
    updatedBlog.user = updatedBlog.user.id;
    const response = await blogService.update(blog.id, updatedBlog);
    handleBlogUpdate(response)
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id);
      handleBlogDelete(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>
            like
          </button></div>
          <div>{blog.user?.name}</div>
          {(user.username === blog.user.username) && (<button style={{
            borderRadius: '4px',
            border: '1px solid #1367ba',
            background: 'linear-gradient(to bottom, #80ccff 0%, #33adff 45%, #0088cc 50%, #0099ff 100%)',
          }} onClick={() => handleRemove(blog)}>
            remove
          </button>)}

        </div>
      )}
    </div>
  )
}

export default Blog



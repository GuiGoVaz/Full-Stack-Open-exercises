import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const [likesUpdated, setLikesUpdated] = useState(0)

  const handleLike = async (blog) => {
    blog.likes = blog.likes + 1
    const updatedBlog = { ...blog };
    updatedBlog.user = updatedBlog.user.id;
    blogService.update(blog.id, updatedBlog)
    setLikesUpdated(likesUpdated + 1)
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
          <button style={{
            borderRadius: '4px',
            border: '1px solid #1367ba',
            background: 'linear-gradient(to bottom, #80ccff 0%, #33adff 45%, #0088cc 50%, #0099ff 100%)',
          }} onClick={() => handleLike(blog)}>
            remove
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog



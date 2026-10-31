import { useState } from 'react'
import { Link } from 'react-router-dom'



const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)





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



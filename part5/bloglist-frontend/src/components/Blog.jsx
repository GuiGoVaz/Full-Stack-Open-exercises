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
      {`${blog.title} by ${blog.author}`}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
    </div>



  )
}

export default Blog



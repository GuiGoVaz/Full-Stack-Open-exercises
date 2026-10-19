import Togglable from './Toggable'
import userService from '../services/login'

const Blog = ({ blog }) => {
  const getUser = async (userId) => {
    const user = userService.getByID(userId);
    return user.name
  }

  return (
    <div>
      {blog.title} {blog.author} <Togglable buttonLabel="view">
        {blog.url} {blog.likes} {getUser(blog.user)}
      </Togglable>
    </div>
  )
}

export default Blog
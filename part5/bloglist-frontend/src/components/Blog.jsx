import Togglable from './Toggable'
import userService from '../services/users'

const getUser = async (userId) => {
  const user = userService.getByID(userId);
  return user.name
}


const Blog = ({ blog }) => {
  const a = getUser(blog.user.toString())

  return (
    <div>
      {blog.title} {blog.author} <Togglable buttonLabel="view">
        {blog.url} {blog.likes} {a}
      </Togglable>
    </div>
  )
}

export default Blog
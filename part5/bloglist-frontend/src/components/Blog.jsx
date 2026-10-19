import Togglable from './Toggable'
import userService from '../services/login'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} <Togglable buttonLabel="view">
      {blog.url} {blog.likes} {userService.getByID(blog.user)}
    </Togglable>
  </div>
)

export default Blog
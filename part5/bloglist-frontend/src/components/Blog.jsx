import Togglable from './Toggable'
import userService from '../services/login'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} <Togglable buttonLabel="view">
      {blog.url} {blog.likes} {blog.user.toString()}
    </Togglable>
  </div>
)

export default Blog
import Togglable from './Toggable'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} <Togglable buttonLabel="view">
      {blog.url} {blog.likes}
    </Togglable>
  </div>
)

export default Blog
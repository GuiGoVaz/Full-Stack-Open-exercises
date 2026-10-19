const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} <Togglable buttonLabel="view">

    </Togglable>
  </div>
)

export default Blog
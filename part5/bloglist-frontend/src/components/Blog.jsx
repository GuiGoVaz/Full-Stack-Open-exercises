import Togglable from './Toggable'



const Blog = ({ blog, name }) => {

  return (
    <div>
      {blog.title} {blog.author} <Togglable buttonLabel="view">
        {blog.url} {blog.likes} {name}
      </Togglable>
    </div>
  )
}

export default Blog
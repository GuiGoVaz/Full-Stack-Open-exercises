import { Link } from 'react-router-dom'

const BlogForm = ({ blogs }) => {

  blogs.sort((a, b) => b.likes - a.likes);
  return (
    <ul>
      {blogs.map(blog => {
        return (<li key={blog.id}><Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link></li>)
      }
      )}</ul>
  )
}
export default BlogForm



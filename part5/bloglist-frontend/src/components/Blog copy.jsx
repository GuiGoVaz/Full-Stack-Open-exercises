import { useState } from 'react'



const BlogsPage = ({ blog, user, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)


  const loggedIn = () => {
    const logout = () => {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }
    return (
      <p> {user.name} logged in <button onClick={logout} type="submit">
        logout
      </button></p>
    )
  }

  const blogForm = () => {
    blogs.sort((a, b) => b.likes - a.likes);
    return (
      <>
        {blogs.map(blog => {
          return (<Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} />)
        }
        )}</>
    )
  }

  const handleCreateBlog = async (blogObject) => {

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotifMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
    catch {
      setNotifMessage('missing title or url')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
      throw new Error("missing title or url");
    }
  }




  return (

    <div><h2>blogs</h2>
      <Notification message={notifMessage} />
      {loggedIn()}
      <Togglable buttonLabel="create new blog" buttonLabel2="cancel">
        <CreateBlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      {blogForm()}
    </div>

  )
}

export default BlogsPage



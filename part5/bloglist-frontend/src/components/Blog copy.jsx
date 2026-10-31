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





  return (
    <div>
      {!user && (<div><LoginForm notifMessage={notifMessage} handleLogin={handleLogin} username={username}
        setUsername={setUsername} password={password} setPassword={setPassword} /> </div>)}
      {user && (
        <div><h2>blogs</h2>
          <Notification message={notifMessage} />
          {loggedIn()}
          <Togglable buttonLabel="create new blog" buttonLabel2="cancel">
            <CreateBlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>
          {blogForm()}
        </div>)}
    </div>
  )
}

export default BlogsPage



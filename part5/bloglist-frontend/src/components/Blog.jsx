import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { Paper, Typography, Link, Button, Box, Stack } from '@mui/material'

const Blog = ({ blog, user, setBlogs }) => {
  const navigate = useNavigate()
  const handleBlogUpdate = (updatedBlog) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    )
  }

  const handleLike = async (blog) => {
    const updatedBlog = { ...blog }
    updatedBlog.likes = updatedBlog.likes + 1
    updatedBlog.user = updatedBlog.user.id
    const response = await blogService.update(blog.id, updatedBlog)
    handleBlogUpdate(response)
  }

  const handleBlogDelete = (idToDelete) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== idToDelete))
  }
  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      handleBlogDelete(blog.id)
      navigate('/')
    }
  }
  if (!blog) {
    return null
  }

  const canRemove = user && blog.user && (user.username === blog.user.username)

  return (
    <Box sx={{ mt: 3, maxWidth: 650 }}>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 2,
          borderColor: '#e2e5e8',
        }}
      >
        <Stack spacing={1.2}>
          {/* Blog Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.2,
            }}
          >
            {blog.title}
          </Typography>

          {/* Author */}
          <Typography
            sx={{
              color: '#555',
              fontSize: '1.05rem',
            }}
          >
            by {blog.author}
          </Typography>

          {/* URL */}
          <Box>
            <Link
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                color: '#1976d2',
                fontSize: '1rem',
              }}
            >
              {blog.url}
            </Link>
          </Box>

          {/* Added by */}
          <Typography
            sx={{
              color: '#444',
              fontSize: '0.95rem',
            }}
          >
            Added by {blog.user?.name || blog.user?.username}
          </Typography>

          {/* Likes & Buttons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              pt: 0.5,
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#111' }}>
              {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
            </Typography>

            {user && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleLike(blog)}
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  px: 1.5,
                  py: 0.3,
                  minWidth: 'auto',
                }}
              >
                LIKE
              </Button>
            )}

            {canRemove && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleRemove(blog)}
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  px: 1.5,
                  py: 0.3,
                  minWidth: 'auto',
                }}
              >
                REMOVE
              </Button>
            )}
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
export default Blog



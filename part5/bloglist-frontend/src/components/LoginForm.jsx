<<<<<<< HEAD
import Notification from './Notification'


const LoginForm = (props) => {

  return (
    <><h2>Log in to application</h2>
      <Notification message={props.notifMessage} />
      <form onSubmit={props.handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={props.username}
              onChange={({ target }) => props.setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={props.password}
              onChange={({ target }) => props.setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form></>
=======
import { Box, Typography, TextField, Button } from '@mui/material';
import Notification from './Notification'

const LoginForm = (props) => {
  const inputStyle = {
    fontSize: '1rem',
    '& .MuiInput-underline:before': {
      borderBottomColor: '#ccc', // default underline color
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: '#999', // hover underline color
    },
  };

  return (
    <Box
      component="form"
      onSubmit={props.handleLogin}
      sx={{
        width: 260,
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontWeight: 700,
          color: '#111',
          mb: 1,
        }}
      >
        Log in to application
        <Notification message={props.notifMessage} />
      </Typography>

      <TextField
        variant="standard"
        placeholder="username"
        value={props.username}
        onChange={({ target }) => props.setUsername(target.value)}
        fullWidth
        sx={inputStyle}
      />

      <TextField
        variant="standard"
        type="password"
        placeholder="password"
        value={props.password}
        onChange={({ target }) => props.setPassword(target.value)}
        fullWidth
        sx={inputStyle}
      />

      <Box sx={{ mt: 1 }}>
        <Button
          type="submit"
          variant="contained"
          disableElevation={false}
          sx={{
            bgcolor: '#1976d2',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.5px',
            px: 2.5,
            py: 1,
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            '&:hover': {
              bgcolor: '#1565c0',
            },
          }}
        >
          LOGIN
        </Button>
      </Box>
    </Box>
>>>>>>> draft
  )
}

export default LoginForm
<<<<<<< HEAD
=======
import { Alert } from '@mui/material'

>>>>>>> draft
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

<<<<<<< HEAD
  return <div className="notification">{message}</div>
=======
  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={message.type}>
      {message.text}
    </Alert>
  )
>>>>>>> draft
}

export default Notification
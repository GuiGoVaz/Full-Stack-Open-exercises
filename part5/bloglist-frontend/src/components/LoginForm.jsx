import Notification from './Notification'

const LoginForm = (props) => (
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
)

export default LoginForm
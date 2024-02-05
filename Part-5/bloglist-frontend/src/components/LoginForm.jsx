import PropTypes from 'prop-types'

const LoginForm = ({ onFormLogin, username, password, setUsername, setPassword }) => {

  LoginForm.propTypes = {
    onFormLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired
  }

  return (
    <div>
      <form id='loginForm' onSubmit={onFormLogin}>
        <div>
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="text"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
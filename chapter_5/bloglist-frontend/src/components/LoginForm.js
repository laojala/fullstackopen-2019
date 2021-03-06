import React from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks'
import { handleLogin } from '../reducers/loggedInUserReducer'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  //jokunen/salainen

  const loginUser = async (event) => {
    event.preventDefault()
    props.handleLogin(username.value, password.value)
    username.reset()
    password.reset()
  }

  return (
    <>
        <h2>Login</h2>
        <form onSubmit={loginUser}>
          <div>
            Username:
            <input data-testid="username" {...username.omitreset} />
          </div>
          <div>
            Password:
            <input data-testid="password" {...password.omitreset} />
          </div>
          <button data-testid="submitlogin" type="submit">Login</button>
        </form>
    </>
  )

}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
  }
}

const mapDispatchToProps = {
  handleLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
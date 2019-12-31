import React from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks'
import { handleLogin } from '../reducers/loggedInUserReducer'

//blogger1/kissakala
//blogger2/kissakala

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

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
            <input {...username.omitreset} /> 
          </div>
          <div>
            Password:
            <input {...password.omitreset} /> 
          </div>
          <button type="submit">Login</button>
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
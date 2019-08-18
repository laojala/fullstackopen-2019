import React from 'react'

//blogger1/kissakala
//blogger2/kissakala

const LoginForm = (handleLogin, username, password) => (
    <>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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

export default LoginForm
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import  { useField } from './hooks'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import AllBlogs from './components/allBlogs'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'


const App = (props) => {

  const [users, setUsers] = useState([])

  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect( () => {

    let usersData = []

    async function fetchData() {
      usersData = await userService.getAll()
      setUsers(usersData)
    }

    async function fetchBlogs() {
      await props.initializeBlogs()
    }

    fetchData()
    fetchBlogs()

  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      username.reset()
      password.reset()
      showMessage('Logged in')

    } catch (exception) {
      console.log('ERROR:', exception)
      showMessage('Incorrect username or password', false)
    }
  }

  const showMessage = (message, successNotification=true) => {
    props.setNotification(message, successNotification)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginFormJSX = () => (
    <div>
      {LoginForm(handleLogin, username, password)}
    </div>
  )

  return (
    <>
      <div><Notification /></div>
      <h1>Blog List</h1>
      {!user ? loginFormJSX() : 
        <>
          <div>{user.name} logged in</div>
          <div>{LogoutButton(handleLogout)}</div>
          <AllBlogs users={users} user={user}/>
        </>}
    </>)

}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
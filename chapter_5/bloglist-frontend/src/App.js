import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import  { useField } from './hooks'
import blogService from './services/blogs'
import AllBlogs from './components/AllBlogs'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { getAllUsers } from './reducers/allUsersResucer'
import { handleLogin, setAlreadyLogged, logout } from './reducers/loggedInUserReducer'


const App = (props) => {

  const username = useField('text')
  const password = useField('password')

  useEffect( () => {

    async function fetchData() {
      await props.getAllUsers()
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
      blogService.setToken(user.token)
      props.setAlreadyLogged(user)
    }
  },[])

  const loginUser = async (event) => {
    event.preventDefault()
    props.handleLogin(username.value, password.value)
    username.reset()
    password.reset()
  }

  const showMessage = (message, successNotification=true) => {
    props.setNotification(message, successNotification)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    props.logout()
  }

  const loginFormJSX = () => (
    <div>
      {LoginForm(loginUser, username, password)}
    </div>
  )

  return (
    <>
      <div><Notification /></div>
      <h1>Blog List</h1>
      {!props.loggedInUser ? loginFormJSX() : 
        <>
          <div>{props.loggedInUser.name} logged in</div>
          <div>{LogoutButton(handleLogout)}</div>
          <AllBlogs allUsers={props.allUsers}/>
        </>}
    </>)

}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    allUsers: state.allUsers,
    loggedInUser: state.loggedInUser,
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  getAllUsers,
  handleLogin,
  setAlreadyLogged,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
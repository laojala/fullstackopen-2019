import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogsReducer'
import { getAllUsers } from './reducers/allUsersResucer'
import { setAlreadyLogged } from './reducers/loggedInUserReducer'


const App = (props) => {

  const dispatch = useDispatch()

  useEffect( () => {
    async function fetchData() {
      await dispatch(getAllUsers())
    }
    async function fetchBlogs() {
      await dispatch(initializeBlogs())
    }
    fetchData()
    fetchBlogs()
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setAlreadyLogged(user))
    }
  },[dispatch])

  return (
    <>
      <div><Notification /></div>
      <h1>Blog List</h1>
      {!props.loggedInUser ? <LoginForm/>: 
        <>
          <div>{props.loggedInUser.name} logged in</div>
          <div><LogoutButton/></div>
          <BlogList allUsers={props.allUsers}/>
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
  initializeBlogs,
  getAllUsers,
  setAlreadyLogged,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
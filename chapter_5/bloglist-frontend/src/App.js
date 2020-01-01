import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import blogService from './services/blogs'
import BlogList from './components/BlogList'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Menu from './components/Menu'
import Users from './components/Users'
import User from './components/User'
import { initializeBlogs } from './reducers/blogsReducer'
import { getAllUsers } from './reducers/allUsersReducer'
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
      props.setAlreadyLogged(user)
    }
  },[])

  const userById = (id) =>
    props.allUsers.find(user => user.id === id)

  const blogById = (id) =>
    props.blogs.find(blog => blog.id === id)

  return (
    <Router>
      <div><Notification /></div>
      {!props.loggedInUser ? <LoginForm/>: 
        <>
          <Menu name={props.loggedInUser.name}/>
          <Route exact path="/" render={() => <BlogList allUsers={props.allUsers}/>} />
          <Route exact path="/users" render={() => <Users />} />
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />} />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <BlogDetails blog={blogById(match.params.id)} />} /> 
        </>}
    </Router>)

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
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import  { useField } from './hooks'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'


const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])


  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  //add new blog
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const blogFormRef = React.createRef()

  useEffect( () => {

    let usersData = []
    let blogsData = []

    async function fetchData() {
      usersData = await userService.getAll()
      blogsData = await blogService.getAll()

      setUsers(usersData)
      setBlogs(blogsData.sort((a, b) => b.likes - a.likes))

    }

    fetchData()

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

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleNewTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlogEntry = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const newBlog = await blogService.create(blogObject)

      blogFormRef.current.toggleVisibility()

      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      showMessage(`Added blog "${blogObject.title}"`)

    } catch (exception) {
      showMessage(`Error: ${exception}`, false)
    }
  }

  const handleLike = async (id) => {

    const blog = blogs.find(blog => blog.id === id)
    blog.likes += 1
    const newBlogs = [...blogs]
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))

    setBlogs(newBlogs)
    blogService.update(blog)
  }

  const removeBlog = async (blog) => {

    if (window.confirm(`Remove ${blog.title}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(item => item.id !== blog.id ))
        showMessage(`Blog ${blog.title} removed`)
      }
      catch (error) {
        showMessage(`Could not remove blog: "${blog.title}"`, false)
      }
    }
  }

  const showMessage = (message, successNotification=true) => {
    props.setNotification(message, successNotification)
  }

  const loginFormJSX = () => (
    <div>
      {LoginForm(handleLogin, username, password)}
    </div>
  )

  const blogsJSX = () => (
    <>
    <div>{user.name} logged in</div>
    <div>{LogoutButton(handleLogout)}</div>
    <h2>Blogs</h2>
    <Togglable buttonLabel='Add blog' ref={blogFormRef}>
      <div>{AddBlog(addBlogEntry, newTitle, handleNewTitle, newAuthor, handleNewAuthor, newUrl, handleNewUrl)}</div>
    </Togglable>
    <br/>
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          users={users}
          user={user}
          handleNewLike={() => handleLike(blog.id)}
          removeBlog = {() => removeBlog(blog)} />
      )}
    </div>
    </>
  )


  return (
    <>
      <div><Notification /></div>
      <h1>Blog List</h1>
      {!user ? loginFormJSX() : blogsJSX()}
    </>)

}

const mapDispatchToProps = {
  setNotification,
}


export default connect(null, mapDispatchToProps)(App)
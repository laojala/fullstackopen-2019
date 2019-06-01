import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import ListBlogs from './components/ListBlogs'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  //login
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //notifications
  const [ notification, setNotification] = useState(null)
  const [ success, setSuccess] = useState(null)

  //add new blog
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
      showMessage('Logged in')


    } catch (exception) {
      console.log("ERROR:", exception)
      showMessage(`Incorrect username or password`, false)
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
      
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      showMessage(`Added blog "${blogObject.title}"`)

    } catch (exception) {
      showMessage(`Error: ${exception}`, false)
      }
    }

  const showMessage = (message, successNotification=true) => {
    setNotification(message)
    setSuccess(successNotification)
    
    setTimeout(() => {
      setNotification(null)
      setSuccess(null)
    }, 5000)
  }

  const loginFormJSX = () => (
    <div>
    {LoginForm(handleLogin, username, setUsername, password, setPassword)}
  </div>
  )

  const blogsJSX = () => (
    <>
    <div>{user.name} logged in</div>
    <div>{LogoutButton(handleLogout)}</div>
    <h2>Blogs</h2>
    <Togglable buttonLabel='Add blog'>
      <div>{AddBlog(addBlogEntry, newTitle, handleNewTitle, newAuthor, handleNewAuthor, newUrl, handleNewUrl)}</div>
    </Togglable>
    <br/>
    <div>
      {blogs.map(blog =>
        <ListBlogs key={blog.id} blog={blog} />
      )}
    </div>
    </>
  )

  return (
    <>
      <div>{Notification(notification, success)}</div>
      <h1>Blog List</h1>
      {!user ? loginFormJSX() : blogsJSX()}
    </>)

 
}

export default App
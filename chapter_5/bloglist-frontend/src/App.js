import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import ListBlogs from './components/ListBlogs'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import AddBlog from './components/AddBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    } catch (exception) {
      console.log("ERROR:", exception)
      // setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }


  if (user === null)
    return (
      <div>
        {LoginForm(handleLogin, username, setUsername, password, setPassword)}
      </div>
    )
  else 
      return (
        <>
        <div>{user.name} logged in</div>
        <div>{LogoutButton(handleLogout)}</div>
        <h2>Blogs</h2>
        <AddBlog />
        <br/>
        <div>
          {blogs.map(blog =>
            <ListBlogs key={blog.id} blog={blog} />
          )}
        </div>
        </>
      )
}

export default App
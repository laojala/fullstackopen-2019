import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('Login successful', username)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('User:', user)
    } catch (exception) {
      console.log("ERROR:", exception)
      console.log('User:', user)
      // setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
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
        <h2>Blogs</h2>
        <div>{user.name} logged in</div>
        <br/>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        </>
      )
}

export default App
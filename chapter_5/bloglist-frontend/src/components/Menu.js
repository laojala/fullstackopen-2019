import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const Menu = (props) => {
  const padding = {
    paddingRight: 20,
  }
  return (
        <>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <span style={padding}>{props.name} logged in</span>
        <LogoutButton/>
        </>
  )
}

export default Menu
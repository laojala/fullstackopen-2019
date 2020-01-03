import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { Container, Table, Form, Button, Message, Menu } from 'semantic-ui-react'

const MenuComponent = (props) => {
  const padding = {
    paddingRight: 20,
  }
  return (
    <Menu>
      <Menu.Item link>
        <Link to="/">blogs</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/users">users</Link>
      </Menu.Item>
      <Menu.Item>
        <span>{props.name} logged in</span>
      </Menu.Item>
      <Menu.Item>
        <LogoutButton/>
      </Menu.Item>
    </Menu>
  )
}

export default MenuComponent
import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loggedInUserReducer'

const LogoutButton = (props) => {

  const handleLogout = () => {
    props.logout()
  }
  
  return (
    <>
      <button type="submit" onClick={handleLogout}>Logout</button>
    </>
  )
}

const mapDispatchToProps = {
  logout,
}

export default connect(null, mapDispatchToProps)(LogoutButton)


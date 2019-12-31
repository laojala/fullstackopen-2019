import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loggedInUserReducer'

const LogoutButton = (props) => {

  const handleLogout = () => {
    props.logout()
  }
  
  return (
    <div>
      <button type="submit" onClick={handleLogout}>Logout</button>
    </div>
  )
}

const mapDispatchToProps = {
  logout,
}

export default connect(null, mapDispatchToProps)(LogoutButton)


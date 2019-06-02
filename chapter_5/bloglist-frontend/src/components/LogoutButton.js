import React from 'react'

const LogoutButton = (handleLogout) => (
  <div>
    <button type="submit" onClick={handleLogout}>Logout</button>
  </div>
)

export default LogoutButton
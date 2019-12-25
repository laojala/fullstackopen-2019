import React from 'react'

const Notification = ({ store }) => {

  const currentNotification = store.getState().notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (

    currentNotification ?  <div style={style}>{currentNotification}</div> : <div></div>
  )
}

export default Notification
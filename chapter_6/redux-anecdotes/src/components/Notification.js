import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const currentNotification = props.notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    currentNotification ? <div style={style}>{currentNotification}</div> : <div></div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
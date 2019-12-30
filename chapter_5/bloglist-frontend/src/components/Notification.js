import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  if (props.notification === undefined || props.notification === null) {
    return <div></div>
  }

  if (props.success)
    return (
      <div className="success" style={styles.success}>
        {props.notification}
      </div>
    )
  else
    return (
      <div className="success" style={styles.fail}>
        {props.notification}
      </div>
    )
}

var styles = ({
  success: {
    color: 'green',
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,

  },
  fail: {
    color: 'red',
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,

  },
})

const mapStateToProps = (state) => {
  return {
    notification: state.notification.notification,
    success: state.notification.success,
  }
}

export default connect(mapStateToProps)(Notification)
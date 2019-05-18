import React from 'react'

const Notification = (message, success) => {

  if (message === null) {
    return null
  }

  if (success)
    return (
      <div className="success" style={styles.success}>
        {message}
      </div>
    )
  else
    return (
      <div className="success" style={styles.fail}>
        {message}
      </div>
    )
}
  


var styles = ({
    success: {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,

    },
    fail: {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,

  },
  })


export default Notification
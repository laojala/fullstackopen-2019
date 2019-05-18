import React from 'react'

const Notification = ({ message }) => {

  console.log("MESSAGE: " + message )
  
  if (message === null) {
    return null
  }

  return (
    <div className="success" style={styles.success}>
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
  })


export default Notification
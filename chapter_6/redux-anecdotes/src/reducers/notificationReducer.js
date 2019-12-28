
const initialNotification = null

const notificationReducer = (state = initialNotification, action) => {

  console.log("STATE: ", state)

  switch (action.type) {
    case 'NOTIFICATION':
      if (action.data === null)
        return null
      else 
        return `${action.data}`
    default:
      return state
  }
}
  
export const setNotification = (text, timeout) => {

  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION', 
      data: text,
    })

    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION', 
        data: '',})
      }, timeout * 1000)
  }
}


export default notificationReducer
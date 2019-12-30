
const initialNotification = {
    notification: "initial text",
    success: true,
  }

const notificationReducer = (state = initialNotification, action) => {

  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      if (action.notification === null) {
        const nullState = {
          notification: null,
          success: true,
        }
        return nullState
      }
      else {
        const newState = {
          notification: action.notification,
          success: action.success,
        } 
        return newState
      } 
    default:
      return state
  }
}
  
export const setNotification = (text, success) => {
  
  return dispatch => {
    dispatch({
        type: 'SHOW_NOTIFICATION', 
        notification: text,
        success: success,
    })

    setTimeout(() => {
      dispatch({
        type: 'SHOW_NOTIFICATION', 
        notification: null,
        success: true,
      })
      }, 5000)
  }
}


export default notificationReducer
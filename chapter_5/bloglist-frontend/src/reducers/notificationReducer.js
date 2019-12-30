
const initialNotification = {
    notification: null,
    success: true,
  }

const notificationReducer = (state = initialNotification, action) => {

  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      const newState = {
        notification: action.notification,
        success: action.success,
      }
      return newState
    case 'REMOVE_NOTIFICATION':
      const nullState = {
        notification: null,
        success: true,
      }
      return nullState
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
        type: 'REMOVE_NOTIFICATION', 
        notification: null,
        success: true,
      })
      }, 5000)
  }
}


export default notificationReducer
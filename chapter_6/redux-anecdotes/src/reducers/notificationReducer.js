
const initialNotification = null

const notificationReducer = (state = initialNotification, action) => {

  switch (action.type) {
    case 'NOTIFICATION_VOTE':
      if (action.data === null)
        return null
      else 
        return `you voted for: "${action.data}"`
    case 'NOTIFICATION_ANECDOTE':
      if (action.data === null)
        return null
      else 
        return `new anecdote added: "${action.data}"`
    default:
      return state
  }
}
  
export const setVoteNotification = (text) => {
  return {
    type: 'NOTIFICATION_VOTE', 
    data: text
  }
}

export const setAddNotification = (text) => {
  return {
    type: 'NOTIFICATION_ANECDOTE', 
    data: text
  }
}

export default notificationReducer
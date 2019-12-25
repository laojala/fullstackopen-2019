const notificationReducer = (state = 'dummy placeholder text', action) => {

  console.log('state in notificationReducer: ', state)

  switch (action.type) {
    case 'LATEST':
      return state
      //return action.latest
    default:
      return state
  }
}
  

export default notificationReducer
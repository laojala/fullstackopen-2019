import userService from '../services/users'

const allUsersReducer = (state = [], action) => {

  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}
  
export const getAllUsers = () => {
    return async dispatch => {
      const usersData = await userService.getAll()
      dispatch({
        type: 'INIT_USERS',
        data: usersData,
      })
    }
  }


export default allUsersReducer
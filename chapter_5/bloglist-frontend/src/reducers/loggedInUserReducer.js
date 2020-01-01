import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'


const loggedInUserReducer = (state = null, action) => {

  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'ALREADY_LOGGED_IN':
      return action.data
    case 'LOGOUT':
        console.log("logging out")
        return null
    default:
      return state
  }
}

export const handleLogin = (username, password) => {
    let loggingUser = null
    return async dispatch => {
      try {

        loggingUser = await loginService.login({
          username: username, password: password,
        })
    
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(loggingUser)  
        )

        blogService.setToken(loggingUser.token)

        dispatch(setNotification(`Logged in: ${loggingUser.name}`, true))
        
    
      } catch (exception) {
        console.log('ERROR:', exception)
        dispatch(setNotification('Incorrect username or password', false))
      }
      dispatch({
        type: 'LOGIN',
        data: loggingUser,
      })
    }
  }

  export const setAlreadyLogged = (user) => {
    blogService.setToken(user.token)
    return dispatch => {
      dispatch({
        type: 'ALREADY_LOGGED_IN', 
        data: user
      })
    }
    
  }

  export const logout = () => {
    window.localStorage.clear()
    blogService.removeToken()
    return {
      type: 'LOGOUT', 
      data: [],
    }
  }

export default loggedInUserReducer
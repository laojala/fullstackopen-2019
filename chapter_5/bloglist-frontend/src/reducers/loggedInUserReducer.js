import loginService from '../services/login'

const loggedInUserReducer = (state = null, action) => {

  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'ALREADY_LOGGED_IN':
      return action.data
    case 'LOGOUT':
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
        //showMessage('Logged in')
    
      } catch (exception) {
        console.log('ERROR:', exception)
        //showMessage('Incorrect username or password', false)
      }
      dispatch({
        type: 'LOGIN',
        data: loggingUser,
      })
    }
  }

  export const setAlreadyLogged = (user) => {
    return dispatch => {
      dispatch({
        type: 'ALREADY_LOGGED_IN', 
        data: user
      })
    }
    
  }

  export const logout = () => {
    window.localStorage.clear()
    return {
      type: 'LOGOUT', 
      data: [],
    }
  }

export default loggedInUserReducer
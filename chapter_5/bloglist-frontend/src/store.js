import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import loggedInUserReducer from './reducers/loggedInUserReducer'
import allUsersReducer from './reducers/allUsersReducer'

const reducer = combineReducers({
    blogs: blogsReducer,
    notification: notificationReducer,
    loggedInUser: loggedInUserReducer,
    allUsers: allUsersReducer,
  })


const store = createStore(reducer, 
  composeWithDevTools(
   applyMiddleware(thunk)
  )
)

export default store
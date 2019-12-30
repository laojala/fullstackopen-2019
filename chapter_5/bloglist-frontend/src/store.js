import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'

const reducer = combineReducers({
    blogs: blogsReducer,
    notification: notificationReducer,
  })


const store = createStore(reducer, 
  composeWithDevTools(
   applyMiddleware(thunk)
  )
)

export default store
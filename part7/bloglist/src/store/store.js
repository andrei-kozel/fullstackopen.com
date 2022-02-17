import { applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'
import thunk from 'redux-thunk'
import { blogsReducer } from './reducers/blogsReducer'
import { userReducer } from './reducers/userReducer'
import { notificationReducer } from './reducers/notificationReducer'
import { usersReducer } from './reducers/usersReducer'

const rootReducer = combineReducers({
  blogsReducer,
  userReducer,
  notificationReducer,
  usersReducer
})

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

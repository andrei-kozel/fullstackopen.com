import { applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'
import thunk from 'redux-thunk'
import { blogsReducer } from './reducers/blogsReducer'
import { usersReducer } from './reducers/usersReducer'

const rootReducer = combineReducers({
  blogsReducer,
  usersReducer
})

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

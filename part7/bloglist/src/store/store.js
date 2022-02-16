import { applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'
import thunk from 'redux-thunk'
import { blogsReducer } from './reducers/blogsReducer'
import { userReducer } from './reducers/userReducer'

const rootReducer = combineReducers({
  blogsReducer,
  userReducer
})

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

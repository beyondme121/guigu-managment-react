import { combineReducers } from 'redux'
import counterReducer from './counter-reducer'
import userReducer from './users-reducer'

export default combineReducers({
  count: counterReducer,
  users: userReducer
})
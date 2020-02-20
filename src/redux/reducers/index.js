import { combineReducers } from 'redux'
import loginReducer from './login-reducer'
import menuReducer from './menu-reducers'
import categoryReducer from './category-reducer'

export default combineReducers({
  userinfo: loginReducer,
  title: menuReducer,
  categorys: categoryReducer
})

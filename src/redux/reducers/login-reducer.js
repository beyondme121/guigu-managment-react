import { SAVE_USER, DELETE_USER } from '../action-types'

// 获取之前登陆之后保存在local中的用户信息以及token,如果有,初始化redux的状态
let _user = JSON.parse(localStorage.getItem('user'))
let _token = localStorage.getItem('token')


// 用户状态初始化, 维持状态数据 从local中获取
// 为了方便, 增加一个标志, 用于判断用户是否登陆, 同时拥有user和token才认为是登陆
// _user || {}  --> 如果_user存在就用,否则取{}
let initState = {
  user: _user || {},
  token: _token || '',
  isLogin: _user && _token ? true : false
}

export default function (preState = initState, action) {
  let { type, data } = action
  let newState
  switch (type) {
    case SAVE_USER:
      newState = {
        user: data.user,
        token: data.token,
        isLogin: true
      }
      return newState
    case DELETE_USER:
      return {
        user: {},
        token: ''
      }
    default:
      return preState
  }
}

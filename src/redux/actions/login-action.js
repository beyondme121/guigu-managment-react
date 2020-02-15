import { SAVE_USER, DELETE_USER } from "../action-types";

// 保存用户信息的action
export const saveUserinfo = value => {
  let { user, token } = value
  // 将js对象保存到local中必须转换为json字符串  JSON.stringify(obj)
  //
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  return { type: SAVE_USER, data: value }
}

export const deleteUserinfo = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return {
    type: DELETE_USER,
    data: ''
  }
}

import { INCREMENT, DECREMENT } from "../action-types";
// 同步的action, 调用action直接就进行处理状态
export const increment = value => ({ type: INCREMENT, data: value });
export const decrement = value => ({ type: DECREMENT, data: value });

// 异步action

// 希望过1秒之后incrment
// 曲线救国: 异步action,返回的是一个函数,函数内部执行异步的操作,异步执行完成之后执行同步action
export const incrementAsync = (value, time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment(value))
    }, time);
  }
}




// 用户登录状态的action
export const login = (value) => ({type: 'login', data: value })

// 异步的登录状态更新
export const loginAsync = () => {
  return dispatch => {
    fetch('/user/login').then(res => {
      dispatch(login(res.status))
    })
  }
}
































import axios from 'axios'
import qs from 'querystring'
import NProgress from 'nprogress'
import store from '../redux/store'
import { deleteUserinfo } from '../redux/actions/login-action'
import { message } from 'antd';
import { BASE_URL } from '../config'
// nprogress样式引入
import 'nprogress/nprogress.css'

// 统一请求的url
// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = BASE_URL

// 请求拦截
axios.interceptors.request.use(config => {
  // 进度条， 请求开始显示进度条啊
  NProgress.start()
  // 配置头部的token信息 从redux中获取token
  const { token } = store.getState().userinfo
  // if (token) config.headers.Authorization = 'iab_' + token
  if (token) config.headers.common['token'] = token;
  const { method , data } = config
  // // 如果是post方法, 将json格式转化为url-encoded
  // // {name: 'xxx', age: 88} => name=xxx&age=88
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    config.data = qs.stringify(data)
    console.log("config.data: ", config.data)
  }
  return config
})

axios.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  error => {
    // debugger
    NProgress.done()
    // 此处判断是否为401状态, 未授权
    if (error.response.status === 401) {
      message.error('身份验证失败, 请重新登录')
      // 退出登录删除local以及redux状态的actionCreator
      store.dispatch(deleteUserinfo())
    } else {
      message.error('请求出错,请联系管理员')
    }
    // 失败的回调, 如果返回的不是promise对象, 会当做成功返回, 会调用response.use的第一个函数
    return new Promise(() => {})
  }
)
export default axios

import axios from 'axios'
import qs from 'querystring'
import NProgress from 'nprogress'
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

  // console.log(config)
  const { method , data } = config
  // // 如果是post方法, 将json格式转化为url-encoded
  // // {name: 'xxx', age: 88} => name=xxx&age=88
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    config.data = qs.stringify(data)
  }
  return config
})

axios.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  error => {
    NProgress.done()
    message.error(error.message)
    // 失败的回调, 如果返回的不是promise对象, 会当做成功返回, 会调用response.use的第一个函数
    return new Promise(() => {})
  }
)


export default axios

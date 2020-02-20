### antd 配置
```
yarn add react-app-rewired customize-cra babel-plugin-import less less-loader
```
- package.json 修改script
- 新建config-overrides.js

### 项目划分路由
- 一级路由的划分

### antd自定义了一些样式
- 会给h1标签增加margin-bottom: 0.5rem
- h1和img在一行显示会错位

### FeHelper


### 代码格式化
> https://www.jianshu.com/p/fee707c595fc
1. Prettier - Code formatter
2. EditorConfig for VS Code
需添加文件配置
以下文件需要添加到项目根目录
.editorconfig
```
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

.prettierignore
```
**/*.md
**/*.svg
package.json
.umi
.umi-production
```

.prettierrc
```
{
  "singleQuote": false,
  "trailingComma": "es5",
  "printWidth": 100,
  "overrides": [
    {
      "files": ".prettierrc",
      "options": { "parser": "json" }
    }
  ]
}

```

- 需添加依赖
> cnpm install --save-dev --save-exact prettier
- 使用方法
打开需要格式化的文件，使用如下快捷键
windows: CTRL + ALT + F
mac: SHIFT + ALT + F

### 字体 Fira Code
- 下载字体
https://github.com/tonsky/FiraCode

- 配置setting.json
```json
"editor.fontFamily": "'Fira Code',Menlo, Monaco, 'Courier New', monospace",
"editor.fontLigatures": true,
```
- 关联js为jsx
```json
"files.associations": {
      "*.js": "javascriptreact"
  },
```


### antd的表单校验
- 声明式校验
```js
<Form.Item>
  {getFieldDecorator("username", {
    rules: [
      { required: true, message: "Please input your Password!" },
      { min: 4, message: "最小长度4位" },
      { max: 9, message: "最大长度9位" },
      { pattern: /^\w+$/, message: "英文字符下划线" },
    ]
  })(
    <Input
      prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
      placeholder="Username"
    />
  )}
</Form.Item>
```
- 自定义校验
```js

pwdValidator = (rule, value, callback) => {
    if (!value) {
      callback('密码不能为空')
    } else if (value.length < 4) {
      callback('密码不能小于4')
    } else if (value.length > 9) {
      callback('密码不能大于9')
    } else if (!(/^\w+$/).test(value)) {
      callback('密码必须是字母数字下划线')
    }
    callback()
}

<Form.Item>
  {getFieldDecorator("password", {
    rules: [
      { validator: this.pwdValidator}
    ],
  })(
    <Input
      prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
      type="password"
      placeholder="密码"
    />
  )}
</Form.Item>
```

- 表单的统一验证
```js
handleSubmit = e => {
  e.preventDefault()
  this.props.form.validateFields((err, values) => {
    if (!err) {
      console.log(values)
    }
  })
}

<Button type="primary" 
  htmlType="submit" 
  className="login-form-button">
  登录
</Button>
```


### git相关操作复习
- 无论origin有多少分支,提交了多少分支, 只需要git pull就可以把远程的所有分支pull下来
- 然后本地在git checkout xxx分支就可以切换了
- 不要自己在本地创建分支, 比如, git checkout -b redux, 不要这样创建一个本地分支, 然后再git pull,这是错误的,会导致冲突
- 比如远程有master, dev, redux分支, 正确做法
  - git clone 一个项目, clone下来的是master分支
  - git pull
  - git checkout dev  切换到指定的分支
```js
git clone 
```



### 不同action和异步action


### 异步redux
> 所有的异步操作都在action中完成, 比如定时器,ajax请求, 请求完成之后触发一个同步的action去更新状态
```js
import thunk from 'redux-thunk'
export default createStore(reducer, applyMiddleware(thunk))


// 同步action
export const increment = value => ({type: INCREMENT, data: value })
// 所有的异步操作都在action中完成, 比如定时器,ajax请求, 请求完成之后触发一个同步的action去更新状态
// 希望过1秒之后incrment
// 曲线救国: 异步action,返回的是一个函数,函数内部执行异步的操作,异步执行完成之后执行同步action
export const incrementAsync = (value, time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment(value))
    }, time);
  }
}
```

### Redux模块化
- reducer, actionCreator分别创建不同的文件用于处理不同的业务


### 纯函数
- 不能修改参数
- 不能有副作用 网络请求ajax或者输入输出设备
- 不能调用不纯的函数 Date.now() Math.random()之类的可变的函数
- redux中的reducer就是一个纯函数

###  mysql安装与配置
> https://www.cnblogs.com/junhuawang/p/6873525.html

### 请求接口

```js
import axios from 'axios'
// 点击登录提交登录请求
handleSubmit = e => {
  e.preventDefault()
  this.props.form.validateFields((err, values) => {
    if (!err) {
      axios.post('http://localhost:8000/users/login', values)
        .then(res => {
          console.log(res)
        }, error => {
          console.log("error: ", error)
        })
    }
  })
}
```

> 前端点击按钮发送请求, 前端port: 3000, backend: 8000 -> 跨域

```js
Access to XMLHttpRequest at 'http://localhost:8000/users/login' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
login.js:18 error:  Error: Network Error
    at createError (createError.js:16)
    at XMLHttpRequest.handleError (xhr.js:83)

```


- 配置代理转发 package.json
1. 开发环境: 前端向代理服务器请求接口, 代理服务器也是3000端口,不跨域, 代理服务器将请求的api接口, 通过其他的方式,把请求发送给服务器, 将返回的结果再通过ajax的响应返回给前端调用处
2. 跨域说的是浏览器的同源策略, 说的是ajax请求,其他请求不限制, 所以代理服务器发到服务器的请求不是ajax请求
3. 前端就直接请求之前的端口, 而不能是8000端口, 否则代理就没有意义了
4. 重启服务
```js
"proxy": "http://localhost:8000"
```

- 如果服务器只支持处理url-encoded格式
url-encoded: post请求传递的是key=value&key=value 键值对
如何让客户端发送post请求的时候, 也支持提交json字符串? 拦截器
antd表单统一验证中, values是json字符串, 如果后台不支持json就没有办法了


### 拦截器
```js
import axios from 'axios'
import qs from 'querystring'
import { message } from 'antd';
import { BASE_URL } from '../config'

// 统一请求的url
// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = BASE_URL

// 请求拦截
axios.interceptors.request.use(config => {
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
    return response.data
  },
  error => {
    message.error(error.message)
    // 失败的回调, 如果返回的不是promise对象, 会当做成功返回, 会调用response.use的第一个函数
    return new Promise(() => {})
  }
)


export default axios

```

- 配置文件
```js
/**
 * 项目上所有配置信息
 */

// 服务器端的真实地址
export const BASE_URL = 'http://localhost:3000'
```

```js
handleSubmit = e => {
  e.preventDefault();
  this.props.form.validateFields(async (err, values) => {
    if (!err) {
      // post请求,传递values对象, 通过拦截器转化为url-encoded
      // 加入后端不支持json格式的处理, 只能通过前端转换为url-encoded
      // 如果后端支持json, 直接传递json格式的数据即可
      const result = await myAxios.post('/users/login', values)
      console.log("result: ", result)
    }
  });
};
```

### 进度条


### 组件内不能写具体的请求路径
- 封装一个api/index.js 将所有的请求接口写在一个文件便于管理
```js
const result = await myAxios.post('/users/login', values)
```

```js
import myAxios from './myAxios'

export const reqLogin = values => myAxios.post('/users/login', values)
```

### 登录成功跳转
```js
const { status, data, msg } = await reqLogin(values)
if (status === 0) {
  message.success('登录成功', 1)
  this.props.history.replace('/admin')
} else {
  message.warning(msg, 1)
}
```

### 登录成功将用户状态信息保存到redux中

1. 容器组件中调用redux的action
2. 包装UI组件

3. login登录组件只用到了redux中的行为action, 业务逻辑不需要获取用户状态信息,可以不传递参数
```js
import { connect } from 'react-redux'
import { saveUserinfo } from '../../redux/actions/login-action'
// 映射redux的状态以及修改状态的行为action
export default connect(
  // state => ({ userInfo: state.userinfo }),
  state => ({})   // 可以不传递状态
  { saveUserinfo }
)(Form.create()(Login))
```

### redux核心代码
- store.js

```js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
```

- action-types.js

```js
export const SAVE_USER = 'save_user'
```

- reducers/login-reducer.js

```js
import { SAVE_USER } from '../action-types.js'
// 设置初始状态
let initState = {
  user: {},
  token: ''
}
// 接受初始状态以及操作action，返回新的状态

export default function (preState = initState, action) {
  let { type, data } = action
  let newState
  swtich(type) {
    case SAVE_USER:
      newState = {
        user: data.user,
        token: data.token
      }
      return newState
    default:
      return preState
  }
}
```

- actions/login-action.js

```js
import { SAVE_USER } from '../action-types.js'
export const save_userinfo = value => ({ type: SAVE_USER, data: value })
```

- 登录成功后, Admin组件需要获取redux中保管的user信息

```js
import React, { Component } from "react";
import { connect } from 'react-redux'
class Admin extends Component {
  render() {
    return <div>Admin, {this.props.userInfo.user.username}</div>;
  }
}

export default connect(
  state => ({ userInfo: state.userinfo }),
  {}
)(Admin)

```

- 新的问题,页面刷新,redux状态消失
- 刷新页面, redux状态清空, 直接访问 /admin, 可以直接访问

### 维护用户的登录状态
1. 使用localStorage保存用户的状态, 在那里保存, 在页面中setItem?
    通常在一次操作中融合多个操作, --> 在修改redux状态时, 调用local, redux中的action

```js
import { SAVE_USER } from "../action-types";

// 保存用户信息的action
export const saveUserinfo = value => {
  let { user, token } = value
  // 将js对象保存到local中必须转换为json字符串  JSON.stringify(obj)
  // 
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  return { type: SAVE_USER, data: value }
}
```

### 解决两个问题
1. 已经登陆, 希望访问登录页, --> 不允许
2. 未登录, 希望访问管理页面, --> 不允许

- 在登陆login页面中判断如果登陆了跳转到admin
```js
render() {
    // 获取用户是否登陆
    const { isLogin } = this.props.userinfo
    // 判断登陆状态, 已经登陆跳转到admin,就不再访问登陆
    if (isLogin) {
      // this.props.history.replace('/admin')
      return <Redirect to="/admin"/>
    }
}
// ...
// 映射redux的状态以及修改状态的行为action
export default connect(
  state => ({ userinfo: state.userinfo }),  // 从redux中获取所有用户数据,包含是否登陆标识
  { saveUserinfo }
)(Form.create()(Login))
```

- admin.js中判断如果未登录,跳转到登录页 判断redux中的用户状态 isLogin
```js
import React, { Component } from "react";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Admin extends Component {
  render() {
    const { isLogin } = this.props.userinfo
    if (!isLogin) {
      return <Redirect to="/login" />
    }
    return <div style={{fontSize: '26px'}}>
      Admin, {this.props.userinfo.user.username}
    </div>;
  }
}
export default connect(
  state => ({ userinfo: state.userinfo }),
  {}
)(Admin)
```

- 难道每个组件都要从状态中拿出登陆状态,判断一下,再返回组件吗? 使用高阶组件, 传递一个组件, 返回一个经过判断的组件

### 简易版本的退出登陆
- login-action.js中增加deleteUser的actioncreator, 同时清空local中保存的数据
- reducers增加 清空redux状态数据

- login-action.js
```js
import { SAVE_USER, DELETE_USER } from "../action-types";
export const deleteUserinfo = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return {
    type: DELETE_USER,
    data: ''
  }
}
```

- login-reducer.js

```js
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
    // 新增删除用户状态数据
    case DELETE_USER:
      return {
        user: {},
        token: ''
      }
    default:
      return preState
  }
}
```

- action-types.js

```js
export const DELETE_USER = 'delete_user'
```

- 组件中写按钮触发退出登录
```js
// 导入action
export default connect(
  state => ({ userinfo: state.userinfo }),
  { deleteUserinfo }
)(Admin)


logout = () => {
  this.props.deleteUserinfo()
}

<div>
  <button onClick={this.logout}>退出登陆</button>
</div>

// 如果未登录, 重定向到login
if (!isLogin) {
  return <Redirect to="/login" />
}
```

### 装饰器语法
> https://www.babeljs.cn/docs/babel-plugin-proposal-decorators

1. 安装 yarn add @babel/plugin-proposal-decorators
2. 修改vscode配置, 搜索Decorators，选中 Experimental Decorators
3. 配置webpack, 因为使用了react脚手架, 直接在config-overrides.js中增加装饰器语法
```js
const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
  addDecoratorsLegacy()
);

```

- 1. 没有返回值的装饰器函数
```js
// 装饰器函数
function demo (target) { 
  target.username = '给类添加静态属性username'
}

// 类
@demo
class AddUserNameComponent {}

// 类上就有了静态属性
console.log(AddUserNameComponent.username)
```

- 有返回值的情况, 但是不是函数

```js
function demo (target) {
  target.username = 'hello'
  return 100
}

@demo
class Hello {}

// 装饰之后相当于
Hello = demo(Hello)  // 此时Hello类被复写了, 是100
```

- 第三种情况: 有返回值, 是函数

```js
// 第三种情况: 有返回值, 是函数
function noDemo (data) {
  data += '!'
  console.log(data)
  return (target) => {
    target.username = 'sanfeng'
    target.age = 99
    return target
  }
}

// 装饰器调用返回了一个函数，这个函数继续装饰类MyNoDemo
@noDemo('hello')
class MyNoDemo {}

console.log(MyNoDemo.username, MyNoDemo.age)

```


- 改造login组件
> 给Login组件增加装饰器的形式, 链接redux
```js
@connect(
  state => ({ userinfo: state.userinfo }),
  { saveUserinfo }
)
@Form.create()
class Login extends Component {}
export default Login
```

- 改造admin组件

```js
@connect(
	state => ({ userinfo: state.userinfo }),
  { deleteUserInfo }
)
class Admin extends Component {}

export default Admin
```



### 使用高阶组件做登录状态筛选

> 1. 现在有两个一级容器组件, 可以通过判断用户的登录状态, isLogin判断如果为true, 不让访问Login组件, false不让访问Admin组件.
>
> 2. 问题: 如果有20个需要登录的页面需要验证登录状态才能访问, 就不能在每个组件中多次写相同的代码来进行跳转到Login
>
> ```js
> // 某个需要登录才能访问的页面
> render () {
>   const { isLogin } = this.props.userinfo   // 从redux中获取登录判断标识
>   if (!isLogin) {
>     return <Redirect to="/login"/>
>   }
> }
> ```
>
> 3. 构思一个checkLogin的高阶组件, 类似拦截器的作用



```js
// 高阶组件 用于根据用户登录状态 判断
/**
 * 1. 如果已经登陆, 访问 /login, 跳转到 /admin
 * 2. 如果未登录, 访问 /admin , 跳转到 /login
 */

// 高阶组件: 是一个函数, 接收一个组件 返回一个新组件

import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'

export default function (CurrentComponent) {

  @connect(
    state => ({ isLogin: state.userinfo.isLogin })
  )
  class NewComponent extends Component {

    render () {
      // 接收原始组件的所有参数, 原封不动的传递给原始组件
      const { ...params } = this.props
      // 判断逻辑
      const pathname = this.props.history.location.pathname
      if (pathname === '/login' && this.props.isLogin) return <Redirect to="/admin"/>
      if (pathname === '/admin' && !this.props.isLogin) return <Redirect to="/login"/>
      return (
        <CurrentComponent {...params}/>
      )
    }
  }
  return NewComponent
}
```

4. Login和Admin组件中就可以不用单独再进行获取状态, 再进行判断是否为true, 然后再Redirect到不同的路径

```js
// login.js

@connect(
  // 此处获取状态仅仅为了判断, 在高阶组件中完成功能, 此处没必要引入redux中的state数据
  // state => ({ userinfo: state.userinfo }),
  null,
  { saveUserinfo }
)
@Form.create()
// 增加装饰器
@checklogin
class Login extends Component {
  
  render() {
    ////////////////////  注释了 获取登录标识 && 判断并跳转的逻辑  ////////////////////
    // 获取用户是否登陆
    // const { isLogin } = this.props.userinfo

    // 判断登陆状态, 已经登陆跳转到admin,就不再访问登陆
    // if (isLogin) {
    //   // this.props.history.replace('/admin')
    //   return <Redirect to="/admin"/>
    // }
  }
}
```

5. Admin.js

```js
@checklogin
class Admin extends Component {
  
  render() {
    // const { isLogin } = this.props.userinfo
    // if (!isLogin) {
    //   return <Redirect to="/login" />
    // }
  }
}
```



6. 装饰器是自上向下的修饰

> 如下装饰器写法

```js
@connect(
	state => ({ userinfo: state.userinfo }),
  { save_user }
)
@Form.create()
@checklogin
class MyClass {}
```

> 等同于

```js
// 装饰器写法等同于如下的高阶组件写法
export default connect(
  state => ({ userinfo: state.userinfo }),
  { saveUserinfo }
)(Form.create()(checklogin(Login)))
```

### Admin组件布局

- 分析Admin整体布局
  - 左右结构, 左侧导航, 右侧是上中下结构

- 用css样式实现下箭头

```less
.header-bottom-left {
      position: relative;
      width: 25%;
      font-size: 20px;
      text-align: center;
      &::after {
        position: absolute;
        top: 40px;
        // 距离左侧50%, 参考的是父元素(相对对位的父元素)
        left: 50%;
        // 移动参考自身
        transform: translateX(-50%);
        content: '';
        width: 0;
        height: 0;
        display: block;
        border-top: 20px solid blue;
        border-bottom: 20px solid transparent;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
      }
}
```



### 桌面开发工具插件 utools
### 网页全屏
`yarn add screenfull`

- 1. 实现全屏切换
```js
import screenfull from 'screenfull'
// ...
swichScreen = () => {
    screenfull.toggle()
}
```

- 2. 进入全屏后, 图标需要变更为退出全屏的图标
> 设计状态

```js
state = {
  isFull: false
}
swichScreen = () => {
  const { isFull } = this.state
  screenfull.toggle()
  this.setState({
    isFull: !isFull
  })
}
```

- 当用户点击全屏按钮, 然后按ESC, 图标按钮没有变化, 也就是没有调用this.setState修改状态
  - 1. 可以监控键盘事件, 如果按下的是ESC了, 改变状态
  - 2. 使用screenfull提供的api， screenfull.on('change', () => {}), 只要是全屏状态改变就会调用回调函数
    - 这个监控键盘事件是监听键盘事件的, 只需要监听一次, 在didMount中监听
  - 3. swichScreen只用于切换, 生命周期用于监听api的事件监听

```js
  swichScreen = () => {
      screenfull.toggle()
  }

  componentDidMount () {
    screenfull.on('change', () => {
      this.setState({
        isFull: !this.state.isFull
      })
    })
  }
```

- 全屏的设计问题
> 当用户按F11是浏览器全屏
> 程序控制的是浏览器 tab的全屏
> 所以如果F11之后,想通过点击按钮退出全屏是做不到的, W3C的标准


### 退出登录
> this 一般使用箭头函数, 我这么写单纯是为了回顾作用域的知识点

```js
// 退出登录, 模态框
  logout = () => {
    let _this = this
    confirm({
      title: '确定要退出登录?',
      content: '退出登录后需要重新登录',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        _this.props.deleteUserinfo()
      },
      // onCancel() {
      //   console.log('Cancel');
      // },
      onOk: () => {
        this.props.deleteUserinfo()
      }
    });
  }
```

### 处理时间dayjs
```js
import dayjs from 'dayjs'

// dayjs() 返回当前的时间戳
dayjs().format('YYYY-MM-DD HH:mm:ss')
```

```js
  state = {
    date: Date.now()
  }
  componentDidMount () {
    // 开启定时器
    this.timer = setInterval(() => {
      this.setState({
        date: Date.now()
      })
    }, 1000)
    // 监听全屏的变化
    screenfull.on('change', () => {
      this.setState({
        isFull: !this.state.isFull
      })
    })
  }

  // 组件加载开启定时器,卸载需要清空定时器
  componentWillUnmount () {
    clearInterval(this.timer)
  }

  componentDidMount () {
    // 开启定时器
    this.timer = setInterval(() => {
      this.setState({
        date: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000)
    // 监听全屏的变化
    screenfull.on('change', () => {
      this.setState({
        isFull: !this.state.isFull
      })
    })
  }
```



### 获取百度天气

- 使用百度提供的api接口

- 请求方式GET, JSONP的请求方式

- `yarn add jsonp`

- > https://juejin.im/post/5dba482ae51d452a05505da2



### 一个通用问题

- 问题描述

一个函数, 内部开启了一个异步函数调用, 回调函数(注意是回调函数,不是async await，如果是await就没有回调函数涉及到作用域的问题了）的返回值如何传递给最外层的函数

**！！！用Promise**

```js
const getWeather = () => {
	jsonp(url, (err, data) => {
    return data				// 此处return的数据返回给了回调函数, 并没有返回给最外层的getWeather函数
  })
}
```

> http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2

函数接收一个city参数

```js
import jsonp from 'jsonp'
import { WEATHER_BASE_URL , WEATHER_AK_KEY} from '../config'
import { message } from 'antd';

// 百度天气
export const reqWeatherData = city => {
  return new Promise((resolve, reject) => {
    jsonp(`${WEATHER_BASE_URL}?location=${city}&output=json&ak=${WEATHER_AK_KEY}`,(err, data) => {
      if (!err) {
        resolve(data)
      } else {
        // 不要reject, 不优雅
        message.error('获取天气数据失败, 请联系管理员')
      }
    })
  })
}

```

- config.js

集中管理url和ak

```js
export const WEATHER_BASE_URL = 'http://api.map.baidu.com/telematics/v3/weather'
export const WEATHER_AK_KEY = '3p49MVra6urFRGOT9s8UBWr2'
```

- 入口html文件

> 搜狐开放的接口, 查询访问用户的ip地址，城市，邮编信息，
>
> 将信息放在window上,组件内可以使用

```html
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
<script>
      window.returnCitySN = returnCitySN
</script>
```

- 组件内 header

```js
componentDidMount () {
	// 请求百度天气
  this.getWeather()
}

getWeather = async () => {
  const { cname } = window.returnCitySN;
  const { dayPictureUrl, weather } = await reqWeatherData(cname);
  this.setState({
    dayPictureUrl,
    weather,
  });
};
```



### 一个好用的vs插件集合

> https://juejin.im/post/5e440fd4e51d4527271e8b79



### token: 餐厅的代金券

- 请求携带参数
  - query参数
  - param参数
  - 请求体参数
  - headers: token的携带参数的方式
- 第一次用户登录, 用户名密码, 后台校验之后通过，服务器存一份token，发给客户端一份token，用户下次再请求服务器, 会携带这个token, 服务端获取客户端的token与服务器保存的token进行校验, 校验通过允许请求
- token验证不通过的情况
  - 客户端浏览器没有携带token
  - 携带的token过期
  - token被篡改，是错误的token
  - 用户清空了缓存, 刷新了页面(local和redux中都没有了token)



### 请求一个未授权的接口

场景: 无论是否登陆了, 请求产品分类信息 myAxios.get(/manage/Category/list), 返回状态码401

原因分析:

后台在接收请求前要判断请求header中是否携带了token, 校验token. 但是，前端还没有配置请求拦截器, 将除了/login之外的所有请求接口的headers加上token 



### axios请求拦截器配置header

1. 可以从local中获取token
2. 可以从redux中获取token (采取这种方式的原因是: 1. local获取比redux中慢 2. 也不安全)

```js
import store from '../redux/store'

axios.interceptors.request.use(config => {
	// 配置头部的token信息
  // 从redux中获取token
  const { token } = store.getState().userinfo.user
  // if (token) config.headers.Authorization = 'iab_' + token
  if (token) config.headers.common['token'] = token;
  // ...
  
  return config
}
```



### 配合服务端签发带有过期时间的token





### 当token过期,如何处理

1. 不能只是提示用户登录过期
2. 跳转到登录页重新登录

```js
axios.interceptors.response.use(
  response => {
    NProgress.done()
    return response.data
  },
  error => {
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
```



### 左侧导航

- 编写left-nav组件的静态页面, antd的Menu的使用，包含Menu的属性，默认打开，选中，theme等，子菜单
- 点击某个导航
  - 中间区域切换不同菜单对应的内容
  - url变更不同的路径(点击切换路由)
- 设计Admin组件的二级路由



```jsx
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import logo from '../../../assets/images/ABB_Logo.png';
import './left-nav.less';
const { SubMenu, Item } = Menu;

export default class LeftNav extends Component {
  render() {
    return (
      <div>
        <div className="nav-top">
          <img src={logo} alt="logo" />
          <h1>管理后台</h1>
        </div>
        <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="light">
          <Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <Item key="5">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Item>
            <Item key="6">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
```

- Left-nav.less

```less
.nav-top {
  background-color: #fff;
  height: 80px;
  display: flex;
  align-items: center;
  h1 {
    font-size: 24px;
    margin-bottom: 0px;
  }
  img {
    margin: 0 10px;
  }
}
```



- 设计路由

> 在中间区域的content显示内容, 是在admin两个一级路由中的admin路由下的多个二级路由
>
> - 新建多个容器组件(路由组件)，在admin组件中配置路由



- 创建菜单的函数

分析:

1. 如果menuconfig菜单配置数组中,如果某一项没有有子菜单,直接返回Item, 如果有子菜单, 先返回SubMenu
2. 配置SubMenu中的属性, 地柜调用createMenu函数,遍历当前item的children所有的item,渲染子菜单

```js
createMenu = list => {
    return list.map(menu => {
      const { title, key, icon, path, children } = menu
      if (!children) {
        return (
          <Item key={key}>
            <Link to={path}>
              <Icon type={icon} />
              <span>{title}</span>
            </Link>
          </Item>
        );
      } else {
        return (
          <SubMenu
            key={key}
            title={
              <span>
                <Icon type={icon} />
                <span>{title}</span>
              </span>
            }
          >
            { this.createMenu(children) }
          </SubMenu>
        )
      }
    });
};
```

- render方法中的函数调用, Menu不需要遍历

```js
import menuConfig from '../../../config/menu-config';
<Menu
  defaultSelectedKeys={['1']}
  defaultOpenKeys={['sub1']}
  mode="inline"
  theme="light"
  className="menu"
>
  { this.createMenu(menuConfig) }
</Menu>
```



### Mac系统快捷键修改

```js
进行System Preference > Keyboard > Keyboard Shortcuts
选择左边的Application Shortcuts，添加以下的快捷键：

Copy ^C
Undo ^Z
Undo Typing ^Z
Cut ^X
Paste ^V
Select All ^A
```

### 处理导航默认选中+展开问题
- Left-Nav刷新页面,默认选中之前选中的Menu.Item
- 根据url路径, 找到最后一个"/"后的路径,赋值给Menu的属性
- defaultSelectedKeys只能赋值一次,left-nav在整个应用渲染了两次
- 当登录成功后, <Redirect to="/admin"/>, 但是在Admin组件中,没有配置"/admin",而是直接重定向到/admin/home, 程序再次从跟路由中查找, 即从App.js中查找, 找啊找, 一看/login. /admin都没有, 继续进入admin组件中查找, 发现有/admin/home了, 在查找之前, 代码已经执行过了left-nav组件, 组件内又重新获取了url中最后一个单词,home, 和left-nav第一次获取的第一个单词admin并不冲突, 都能够获取到, 但是antd中的Menu组件的defaultSelectedKeys只能接收一次,之后再次赋值就没有效果了。这就是使用defaultSelectedKeys的"坑",使用selectedKeys就没有这个问题

```js
import { withRouter } from 'react-router-dom'

@withRouter
class LeftNav extends Component {
  render () {
    const { pathname } = this.props.history.location
    let selectedKeys = pathname.split('/').reverse()[0]
    // ...
    return (
      // ...
      <Menu
        selectedKeys={[selectedKeys]}
      >
      </Menu>
    )
  }
}
export default LeftNav
```


### 如何区分一个组件是路由组件还是普通组件
- 如果直接被Switch包裹起来的就是路由组件
- 中间有别的嵌套就没有路由组件中history,match等路由属性
- 比如left-nav组件, 在Admin组件中, 而check-login组件中可以获取history,是因为可以直接修饰路由组件
- check-login装饰了login以及admin, 这两个组件在App中被Swith包裹
```js
// Admin.js
<Sider>
  <LeftNav />
</Sider>
// App.js
<Switch>
  <Route path="/login" component={Login}/>
  <Route path="/admin" component={Admin}/>
  <Redirect to="/login" />
</Switch>
```

### 给非路由组件添加路由属性
- withRouter

### 增加默认打开二级菜单功能
> 当选中某个菜单,或者路由跳转回原来的某个二级Item, 上一级的SubMenu要展开

```js
let openKeys = pathname.split('/').splice(2)    // 返回数组
defaultOpenKeys={openKeys}      // 接收数组, 接收多了也无妨
```

### 16.10之后新增的生命周期函数
- getDerivedStateFromProps(props, state)
- 1. 阶段: 在render之前执行, 意味着在组件还没有render之前就可以设置状态
- 2. 可以接受父组件传递进来的参数, 作为组件本身的状态
- 3. 静态方法, 必须有返回值, 可以是state对象,也可以是null
- 4. 必须有自己的state, 必须声明
```js
import React, { Component } from 'react'
class Demo extends Component {
  state = {
    name: 'initname',
    age: 10
  }
  // 新增
  static getDerivedStateFromProps (props, state) {
    console.log(props)  // 父组件传递的所有属性的对象 {username: 'xx', age: 18,...}
    console.log(state)  // 初始的state
    // 处理props, 将处理后的props进行返回, 作为Demo组件的状态
    return {
      name: props.username,
      age: props.age + 10
    }
  }
  render () {
    return (
      <div>
        {this.state.name} <br/>
        {this.state.age }
      </div>
    )
  }
}

export default class Life extends Component {
  state = {
    username: 'sanfengxxxx',
    count: 0
  }
  componentDidMount () {
    console.log('componentDidMount')
    this.timer = setInterval(() => {
      this.setState(preState => ({
        count: preState.count + 1
      }))
    }, 1000)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  render() {
    const { username, count } = this.state
    return (
      <div>
        { this.state.count }
        <Demo username={username} age={count}/>
      </div>
    )
  }
}
```
### 新增的第一个钩子getSnapshotBeforeUpdate
- 这个钩子只在组件更新时触发，第一次渲染不执行
- 执行时机在render之后, 在componentDidUpdate之前
- 配合componentDidUpdate使用
- 用途: 获取组件在更新前的状态, 比如滚动条

```js
// 接受props, state, 返回值传递给didupdate作为参数props
  getSnapshotBeforeUpdate(props, preState) {
    console.log("getSnapshotBeforeUpdate, props: ", props)
    console.log("getSnapshotBeforeUpdate, preState: ", preState)
    return "hello world"
  }

  componentDidUpdate (props, preState, data) {
    console.log(props, preState, data)
  }

```

### 修改yarn npm的镜像
```js
npm config set registry https://registry.npm.taobao.org/
yarn config set registry https://registry.npm.taobao.org/
```

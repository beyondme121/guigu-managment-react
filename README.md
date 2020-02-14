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

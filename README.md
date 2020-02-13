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
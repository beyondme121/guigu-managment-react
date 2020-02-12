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








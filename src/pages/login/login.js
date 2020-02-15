import React, { Component } from "react";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from "antd";
import { reqLogin } from '../../api'
import { saveUserinfo } from '../../redux/actions/login-action'

import "./css/login.less";
import logo from "../../assets/images/ABB_Logo.png";
const { Item } = Form;

@connect(
  state => ({ userinfo: state.userinfo }),
  { saveUserinfo }
)
@Form.create()
class Login extends Component {
  // 点击登录提交登录请求

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // post请求,传递values对象, 通过拦截器转化为url-encoded
        // 加入后端不支持json格式的处理, 只能通过前端转换为url-encoded
        // 如果后端支持json, 直接传递json格式的数据即可
        // const result = await myAxios.post('/users/login', values)
        const { status, data, msg } = await reqLogin(values)
        if (status === 0) {
          message.success('登录成功', 1)
          this.props.history.replace('/admin')
          this.props.saveUserinfo(data)
        } else {
          message.warning(msg, 1)
        }
      }
    });
  };

  pwdValidator = (rule, value, callback) => {
    if (!value) {
      callback("密码不能为空");
    } else if (value.length < 4) {
      callback("密码不能小于4");
    } else if (value.length > 9) {
      callback("密码不能大于9");
    } else if (!/^\w+$/.test(value)) {
      callback("密码必须是字母数字下划线");
    }
    callback();
  };

  render() {
    // 获取用户是否登陆
    const { isLogin } = this.props.userinfo
    const { getFieldDecorator } = this.props.form;

    // 判断登陆状态, 已经登陆跳转到admin,就不再访问登陆
    if (isLogin) {
      // this.props.history.replace('/admin')
      return <Redirect to="/admin"/>
    }

    return (
      <div id="login">
        <div className="login-header">
          <img src={logo} alt="" />
          <h1>商品管理系统</h1>
        </div>
        <div className="login-content">
          <h1>登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your Password!" },
                  { min: 4, message: "最小长度4位" },
                  { max: 9, message: "最大长度9位" },
                  { pattern: /^\w+$/, message: "英文字符下划线" },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ validator: this.pwdValidator }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Item>
              <Button type="primary" className="login-form-button"
                htmlType="submit"
              >
                提交
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    );
  }
}

// 映射redux的状态以及修改状态的行为action
// export default connect(
//   state => ({ userinfo: state.userinfo }),
//   { saveUserinfo }
// )(Form.create()(Login))

export default Login

import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { reqLogin } from '../../api'

import "./css/login.less";
import logo from "../../assets/images/ABB_Logo.png";

const { Item } = Form;
class Login extends Component {
  // 点击登录提交登录请求
  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       myAxios.post("/users/login", values).then(
  //         res => {
  //           console.log(res);
  //         },
  //         error => {
  //           console.log("error: ", error);
  //         }
  //       );
  //     }
  //   });
  // };

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
    const { getFieldDecorator } = this.props.form;
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

export default Form.create()(Login);

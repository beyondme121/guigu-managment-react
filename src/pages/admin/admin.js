import React, { Component } from "react";
import { connect } from 'react-redux'
import { Layout } from 'antd'

import Header from "./header/header";
import checklogin from '../check-login/check-login'   // 高阶组件, 装饰器
import { deleteUserinfo } from '../../redux/actions/login-action'
import './less/admin.less'

const { Content, Footer, Sider } = Layout
// 装饰器写法
@connect(
  state => ({ userinfo: state.userinfo }),
  { deleteUserinfo }
)
@checklogin
class Admin extends Component {
  logout = () => {
    this.props.deleteUserinfo()
  }
  render() {
    return (
      <Layout className="admin">
        <Sider>Sider</Sider>
        <Layout>
          <Header />
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default Admin

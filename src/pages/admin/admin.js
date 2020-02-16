import React, { Component } from "react";
import { connect } from 'react-redux'
import { Layout, Button } from 'antd'
import { reqCategorys } from '../../api'
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

  getCategory = async () => {
    let result = await reqCategorys()
    console.log("result: ", result)
  }

  render() {
    return (
      <Layout className="admin">
        <Sider>
          <Button onClick={this.getCategory}>请求数据</Button>
        </Sider>
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

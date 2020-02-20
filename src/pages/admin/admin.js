import React, { Component } from "react";
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { reqCategorys } from '../../api'
import { Switch, Route } from 'react-router-dom'
import Header from "./header/header";
import LeftNav from './left-nav/left-nav'
// 引入路由组件
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'

import checklogin from '../check-login/check-login'   // 高阶组件, 装饰器
import { deleteUserinfo } from '../../redux/actions/login-action'
import './admin.less'


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
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content className="admin-content">
            <Switch>
              <Route path="/admin/home" component={Home}/>
              <Route path="/admin/prod_about/category" component={Category}/>
              <Route path="/admin/prod_about/product" component={Product}/>
              <Route path="/admin/user" component={User}/>
              <Route path="/admin/role" component={Role}/>
              <Route path="/admin/charts/bar" component={Bar}/>
              <Route path="/admin/charts/line" component={Line} />
            </Switch>
          </Content>
          <Footer className="admin-footer">建议使用谷歌浏览器</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default Admin

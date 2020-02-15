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

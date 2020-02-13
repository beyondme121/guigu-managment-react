import React, { Component } from "react";

// 引入了react-redux之后,所有业务逻辑都要渲染的是容器组件--负责给UI组件传递状态和行为
import CounterContainer from './container/counter_container'
import UserContainer from './container/user_container'

export default class App extends Component {
  render () {
    return (
      <span>
        <CounterContainer />
        <hr/>
        <UserContainer />
      </span>
    )
  }
}

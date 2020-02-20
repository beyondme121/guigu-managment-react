import React, { Component } from 'react'
import Add from './add'
import List from './list'

export default class Todos extends Component {
  state = {
    todos: ['苹果', '香蕉']
  }
  // 状态与修改状态放在同一个组件当中
  addTodo = (data) => {
    const todos = [...this.state.todos]
    todos.unshift(data)
    this.setState({
      todos
    })
  }

  render() {
    return (
      <div>
        <h2>这是todos首页</h2>
        <Add addTodo={this.addTodo} todoCount = {this.state.todos.length}/>
        <List todos={this.state.todos}/>
      </div>
    )
  }
}

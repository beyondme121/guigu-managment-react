import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Add extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    todoCount: PropTypes.number.isRequired
  }
  constructor (props) {
    super(props)
    this.inputRef = React.createRef()
  }

  handleInput = () => {
    // 1. 不能为空
    // 2. 清空文本框
    let value = this.inputRef.current.value.trim()
    if (!value) return
    this.props.addTodo(this.inputRef.current.value)
    this.inputRef.current.value = ''
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.inputRef}/>
        <button onClick={this.handleInput}>添加#{this.props.todoCount}</button>
      </div>
    )
  }
}

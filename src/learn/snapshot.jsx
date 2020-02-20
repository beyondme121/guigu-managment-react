import React, { Component } from 'react'

export default class Snapshot extends Component {
  state = {
    name: 'hello'
  }
  // 接受props, state, 返回值传递给didupdate作为参数props
  getSnapshotBeforeUpdate(props, preState) {
    console.log("getSnapshotBeforeUpdate, props: ", props)
    console.log("getSnapshotBeforeUpdate, preState: ", preState)
    return "hello world"
  }

  componentDidUpdate (props, preState, data) {
    console.log(props, preState, data)
  }

  render() {
    return (
      <div>
        <p>snapshot...</p>
      </div>
    )
  }
}

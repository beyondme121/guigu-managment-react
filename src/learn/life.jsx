import React, { Component } from 'react'
import SnapShot from './snapshot'
import Todos from './todos'

class Demo extends Component {
  state = {
    name: 'initname',
    age: 10
  }
  // 新增
  static getDerivedStateFromProps (props, state) {
    return {
      name: props.username,
      age: props.age + 10
    }
  }
  render () {
    return (
      <div>
        {this.state.name} <br/>
        {this.state.age }
        <SnapShot age={this.state.age}/>
        <Todos />
      </div>
    )
  }
}

export default class Life extends Component {
  state = {
    username: 'sanfengxxxx',
    count: 0
  }
  demo = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  componentDidMount () {
    console.log('componentDidMount')
    // this.timer = setInterval(() => {
    //   this.setState(preState => ({
    //     count: preState.count + 1
    //   }))
    // }, 1000)
    this.demo()
  }
  componentWillUnmount () {
    // clearInterval(this.timer)
  }
  render() {
    const { username, count } = this.state
    return (
      <div>
        { this.state.count }
        <button onClick={this.demo}>点击更新状态</button>
        <Demo username={username} age={count}/>
      </div>
    )
  }
}

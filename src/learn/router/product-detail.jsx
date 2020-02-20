import React, { Component } from 'react'


export default class ProductDetail extends Component {
  state = {
    detail: []
  }
  componentDidMount () {
    // 请求数据, 更新状态
    setTimeout(() => {
      const result = [
        { id: 1, name: 'sanfeng', salary: 999 },
        { id: 2, name: 'lisi', salary: 888 },
        { id: 3, name: 'wangwu', salary: 777 },
      ]
      this.setState({
        detail: result
      })
    }, 1000)
  }
  render() {
    // 路由中获取路径参数id
    const {id} = this.props.match.params
    let result = this.state.detail
    if (result.length > 0) {
      const item = result.find((item) => {
        return item.id === id * 1
      })
      console.log("item: ", item)
      return (
        <div>
          <p>id: {item.id}</p>
          <p>name: {item.name}</p>
          <p>salary: {item.salary}</p>
        </div>
      )
    } else {
      return <div>loading....</div>
    }

  }
}

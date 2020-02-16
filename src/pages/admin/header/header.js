import React, { Component } from 'react'
import { Button, Icon, Modal } from 'antd'
import { connect } from 'react-redux'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import { deleteUserinfo } from '../../../redux/actions/login-action'
import './header.less'

const { confirm } = Modal

@connect(
  state => ({ userinfo: state.userinfo }),
  { deleteUserinfo }
)
class Header extends Component {
  state = {
    isFull: false,
    // date: dayjs().format(),
    date: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }

  swichScreen = () => {
    screenfull.toggle()
  }

  // 退出登录, 模态框
  logout = () => {
    let _this = this
    confirm({
      title: '确定要退出登录?',
      content: '退出登录后需要重新登录',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        _this.props.deleteUserinfo()
      }
    });
  }

  componentDidMount () {
    // 开启定时器
    this.timer = setInterval(() => {
      this.setState({
        date: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000)
    // 监听全屏的变化
    screenfull.on('change', () => {
      this.setState({
        isFull: !this.state.isFull
      })
    })
  }

  // 组件加载开启定时器,卸载需要清空定时器
  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.swichScreen}>
            <Icon type={this.state.isFull ? "fullscreen-exit" : "fullscreen"} />
          </Button>
          <span>hello, {this.props.userinfo.user.username}</span>
          <Button size="small" type="link" onClick={this.logout}>退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <span>首页</span>
            {/* 在css中添加伪元素 */}
          </div>
          <div className="header-bottom-right">
            <span>{this.state.date}</span>
            <img src="" alt="天气图片"/>
            <span>多云转阴 温度9度</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header

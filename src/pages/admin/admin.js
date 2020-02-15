import React, { Component } from "react";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { deleteUserinfo } from '../../redux/actions/login-action'

class Admin extends Component {
  logout = () => {
    this.props.deleteUserinfo()
  }
  render() {
    const { isLogin } = this.props.userinfo
    if (!isLogin) {
      return <Redirect to="/login" />
    }
    return <div style={{fontSize: '26px'}}>
      Admin, {this.props.userinfo.user.username}
      <div>
        <button onClick={this.logout}>退出登陆</button>
      </div>
    </div>;
  }
}

export default connect(
  state => ({ userinfo: state.userinfo }),
  { deleteUserinfo }
)(Admin)

import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import menuConfig from '../../../config/menu-config';
import logo from '../../../assets/images/ABB_Logo.png';
import './left-nav.less';
const { SubMenu, Item } = Menu;

@withRouter
class LeftNav extends Component {
  createMenu = list => {
    return list.map(menu => {
      const { title, key, icon, path, children } = menu
      if (!children) {
        return (
          <Item key={key}>
            <Link to={path}>
              <Icon type={icon} />
              <span>{title}</span>
            </Link>
          </Item>
        );
      } else {
        return (
          <SubMenu
            key={key}
            title={
              <span>
                <Icon type={icon} />
                <span>{title}</span>
              </span>
            }
          >
            { this.createMenu(children) }
          </SubMenu>
        )
      }
    });
  };

  render() {
    const { pathname } = this.props.history.location
    let selectedKeys = pathname.split('/').reverse()[0]
    let openKeys = pathname.split('/').splice(2)    // 返回数组
    return (
      <div className="left-nav">
        <div className="nav-top">
          <img src={logo} alt="logo" />
          <h1>管理后台</h1>
        </div>
        <Menu
          defaultSelectedKeys={[selectedKeys]}
          defaultOpenKeys={openKeys}      // 接收数组, 接收多了也无妨
          mode="inline"
          theme="light"
          className="menu"
        >
          { this.createMenu(menuConfig) }
        </Menu>
      </div>
    );
  }
}

export default LeftNav

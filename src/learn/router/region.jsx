import React, { Component } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

export default class Region extends Component {
  render() {
    return (
      <div>
        <h2>这是区域页面, 承载子路由</h2>
        <ul>
          <li>
            <Link to="/router/region/north">North</Link>
          </li>
          <li>
            <Link to="/router/region/south">South</Link>
          </li>
          <li>
            <Link to="/router/region/east">East</Link>
          </li>
        </ul>

        <div>以下是路由渲染区域</div>
        <Switch>
          <Route path="/router/region/north" component={North}/>
          <Route path="/router/region/south" component={South}/>
          <Route path="/router/region/east" component={East}/>
          {/* 当以上所有路由都匹配不上, 匹配一个默认的路由地址 */}
          <Redirect to="/router/region/north"/>
        </Switch>
      </div>
    )
  }
}
function North () {
  return <span>North</span>
}

function South () {
  return <span>South</span>
}

function East () {
  return <span>East</span>
}

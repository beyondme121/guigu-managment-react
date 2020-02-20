import React, { Component } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Base from "./base";
import Product from './product'
import Region from './region'

// function NotRouterComponent (props) {
//   console.log('--', props)
//   return (
//     <div>
//       不是路由组件
//     </div>
//   )
// }

export default class Router extends Component {
  render() {
    return (
      <div>
        <h1>路由首页</h1>
        <ul>
          <li>
            <Link to="/router/product">product
            </Link>
          </li>
          <li>
            <Link to="/router/region">Region
            </Link>
          </li>
        </ul>
        <Switch>
          <Route path="/router/base" component={Base}/>
          <Route path="/router/product" component={Product}/>
          <Route path="/router/region" component={Region}/>
          <Redirect to="/router/base"/>
        </Switch>
        <h2>以下不是路由组件，在Switch之外</h2>
        {/* <NotRouterComponent /> */}
      </div>
    )
  }
}

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ProductDetail from './product-detail';
export default class Product extends Component {
  state = {
    list: [],
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        list: [
          { id: 1, name: 'sanfeng', age: 99 },
          { id: 2, name: 'lisi', age: 66 },
          { id: 3, name: 'wangwu', age: 77 },
        ],
      });
    }, 1000);
  }
  render() {
    return (
      <div>
        <div>产品列表</div>
        <ul>
          {this.state.list.map(item => {
            return (
              <li key={item.id}>
                <Link to={`/router/product/detail/${item.id}`}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
        <div>路由容器如下, 如果只有一个路由组件不需要切换, 就不需要Switch</div>
        <Route path="/router/product/detail/:id" component={ProductDetail} />
      </div>
    );
  }
}

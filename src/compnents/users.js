import React, { Component } from "react";

export default class Users extends Component {
  add_user = () => {
    const { name, age } = this.refs; // 解构出来的是dom节点

    this.props.addUser({ name: name.value, age: age.value });
  };
  render() {
    return (
      <div>
        name: <input type="text" ref="name" /> <br />
        age: <input type="text" ref="age" /> <br />
        <button onClick={this.add_user}>添加用户</button>
        <hr />
        <h2>用户列表</h2>
        <ul>
          {this.props.users.map((user, index) => {
            return (
              <li key={index}>
                序号: {index}, {user.name}, {user.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

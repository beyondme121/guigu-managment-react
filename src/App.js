import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

// function App() {
//   return (
//     <Switch>
//       <Route path="/login" component={Login}/>
//       <Route path="/admin" component={Admin}/>
//       <Redirect to="/login" />
//     </Switch>
//   );
// }

// export default App;

class App extends Component {

  render () {
    return (
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin}/>
        <Redirect to="/login" />
      </Switch>
    )
  }
}

export default App
// 装饰器
// 2. 定义装饰函数

// 1. 定义一个基本的类

// 3. 在被装饰的类上添加装饰器

// @demo
// class MyClass {}

// function demo (target) {
//   target.a = 100
// }

// // demo(MyClass)
// console.log(MyClass.a)

// @addProperty
// class Person {}

// function addProperty (target) {
//   target.username = 'sanfeng'
//   target.age = 99
// }

// console.log(Person.username, Person.age)

// 装饰函数有返回值, 不是函数类型
// function demo (target) {
//   target.username = 'hello'
//   return 100
// }

// @demo
// class MyClass {}

// console.log("----", MyClass)      // 100




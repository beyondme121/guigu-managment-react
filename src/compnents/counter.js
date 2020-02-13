// 作为UI组件, 不直接操作redux, 也就是不直接使用this.props.store.xxx
// 无论是获取状态store.getState(),还是派发事件action, store.dispatch(actionCreator)

// UI组件只负责从props中获取redux中的状态, 以及从props中获取action调用的行为
import React, { Component } from "react";

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }
  increment = () => {
    // this.props.store.dispatch({
    //   type: "increment",
    //   data: this.selectRef.current.value * 1
    // });
    // this.props.store.dispatch(increment(this.selectRef.current.value))
    
    // react-redux的写法,传递给redux中的数据就是统一的,不能再让redux再处理格式的工作
    this.props.increment(this.selectRef.current.value * 1)
  };
  decrement = () => {
    // this.props.store.dispatch({
    //   type: "decrement",
    //   data: this.selectRef.current.value * 1
    // });
    // this.props.store.dispatch(decrement(this.selectRef.current.value))

    this.props.decrement(this.selectRef.current.value * 1)
  };
  incrementIfOdd = () => {
    // let preState = this.props.store.getState();
    // if (preState % 2 === 1) {
    //   // this.props.store.dispatch({
    //   //   type: "increment",
    //   //   data: this.selectRef.current.value * 1
    //   // });
    //   this.props.store.dispatch(increment(this.selectRef.current.value))
    // }

    // react-redux
    const { count } = this.props
    if (count % 2 === 1) {
      this.props.increment(this.selectRef.current.value * 1)
    }
  };
  incrementAsync = () => {
    // setTimeout(() => {
    //   // this.props.store.dispatch({
    //   //   type: "increment",
    //   //   data: this.selectRef.current.value * 1
    //   // });
    //   // this.props.store.dispatch(increment(this.selectRef.current.value))

    //   this.props.increment(this.selectRef.current.value * 1)
    // }, 500);

    // 异步action, 不用在UI组件内部编写异步代码, 直接调用异步action
    // 过一秒钟加1
    this.props.incrementAsync(this.selectRef.current.value * 1, 1000)
  };

  render() {
    return (
      <div>
        {/* <span>count is : {this.props.store.getState()}</span> */}
        <span>count is : {this.props.count}</span>
        <select ref={this.selectRef}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementIfOdd}>add if odd</button>
        <button onClick={this.incrementAsync}>add async</button>
      </div>
    );
  }
}

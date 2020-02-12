import React, { Component } from "react";
import { increment, decrement } from '../redux/action-creators'
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
    this.props.store.dispatch(increment(this.selectRef.current.value))
  };
  decrement = () => {
    // this.props.store.dispatch({
    //   type: "decrement",
    //   data: this.selectRef.current.value * 1
    // });
    this.props.store.dispatch(decrement(this.selectRef.current.value))
  };
  incrementIfOdd = () => {
    let preState = this.props.store.getState();
    if (preState % 2 === 1) {
      // this.props.store.dispatch({
      //   type: "increment",
      //   data: this.selectRef.current.value * 1
      // });
      this.props.store.dispatch(increment(this.selectRef.current.value))
    }
  };
  incrementAsync = () => {
    setTimeout(() => {
      // this.props.store.dispatch({
      //   type: "increment",
      //   data: this.selectRef.current.value * 1
      // });
      this.props.store.dispatch(increment(this.selectRef.current.value))
    }, 500);
  };

  render() {
    return (
      <div>
        <span>count is : {this.props.store.getState()}</span>
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

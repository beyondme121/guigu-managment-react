import React, { Component } from 'react'

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
    this.state = {
      count: 0
    };
  }
  increment = () => {
    const { count } = this.state
    this.setState({
      count: count + this.selectRef.current.value*1
    })
  };
  decrement = () => {
    const { count } = this.state
    this.setState({
      count: count - this.selectRef.current.value * 1
    })
  };
  incrementIfOdd = () => {
    const { count } = this.state
    if (count %2 === 1) {
      this.setState({
        count: count + this.selectRef.current.value * 1
      })
    }
  };
  incrementAsync = () => {
    const { count } = this.state
    setTimeout(() => {
      this.setState({
        count: count + this.selectRef.current.value * 1
      })
    }, 600);
  };

  render() {
    return (
      <div>
        <span>count is : {this.state.count}</span>
        <select ref={this.selectRef} >
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

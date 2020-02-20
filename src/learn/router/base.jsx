import React, { Component } from 'react'

export default class Base extends Component {
  render() {
    console.log("Base", this.props)
    return (
      <div>
        base
      </div>
    )
  }
}

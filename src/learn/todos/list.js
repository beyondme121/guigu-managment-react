import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class List extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.props.todos.map((item,index) => (
              <li key={index}>
                {item}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

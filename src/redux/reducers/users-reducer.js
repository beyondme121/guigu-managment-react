import { ADDUSER } from '../action-types'

let initUsers =[
  { name: 'sanfeng', age: 88},
  { name: 'lisi', age: 99}
]

export default function userReducer (state = initUsers, action) {
  switch (action.type) {
    case ADDUSER:
      return [...state, action.data]
    default:
      return state;
  }
}
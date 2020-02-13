import { INCREMENT, DECREMENT} from '../action-types'
let initState = 0
export default function (preState = initState, action) {
  const { type, data } = action
  let newState
  switch (type) {
    case INCREMENT:
      newState = preState + data
      return newState
    case DECREMENT: 
      newState = preState - data
      return newState
    default:
      return preState;
  }
}
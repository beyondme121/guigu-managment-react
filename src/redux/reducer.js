
let initState = 900
export default function (preState = initState, action) {
  const { type, data } = action
  let newState
  switch (type) {
    case 'increment':
      console.log('----')
      newState = preState + data
      console.log(newState)
      return newState
    case 'decrement': 
      newState = preState - data
      return newState
    default:
      return preState;
  }
}
import { SAVE_CATEGORY_LIST } from '../action-types'
let initState = []

export default function (state = initState, action) {
  let { type, data } = action
  switch (type) {
    case SAVE_CATEGORY_LIST:
      return [...data]
    default:
      return state
  }
}

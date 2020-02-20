import { SAVE_TITLE } from '../action-types'
let initTitle = ''
export default function menuReducer (state = initTitle, action) {
  const { type, data } = action
  switch (type) {
    case SAVE_TITLE:
      return data
    default:
      return state
  }
}

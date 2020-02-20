import { SAVE_CATEGORY_LIST } from '../action-types'
import { reqCategorys } from '../../api'
import { message } from 'antd'
// 保存异步action请求回来的数据,并保存在redux
export const saveCategory = (value) => {
  return { type: SAVE_CATEGORY_LIST, data: value }
}

// 异步action: 发送ajax请求, 获取后端的数据, 调用同步的action,让同步的action把数据保存到redux中
export const getCategoryAsync = () => {
  return async dispatch => {
    let { status, data, msg } = await reqCategorys()
    if (status === 0) {
      dispatch(saveCategory(data))
    } else {
      message.error('请求数据出错: ', msg)
    }
  }
}

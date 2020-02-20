import myAxios from './myAxios'
import jsonp from 'jsonp'
import { WEATHER_BASE_URL , WEATHER_AK_KEY} from '../config'
import { message } from 'antd';

export const reqLogin = values => myAxios.post('/users/login', values)

// 百度天气
export const reqWeatherData = city => {
  return new Promise((resolve, reject) => {
    jsonp(`${WEATHER_BASE_URL}?location=${city}&output=json&ak=${WEATHER_AK_KEY}`,(err, data) => {
      if (!err) {
        resolve(data.results[0].weather_data[0])
      } else {
        // 不要reject, 不优雅
        message.error('获取天气数据失败, 请联系管理员')
      }
    })
  })
}

// 请求商品分类数据
export const reqCategorys = () => myAxios.get('/categorys/list')

// 添加商品分类: 参数category就是对象
export const reqAddCategory = (category) => myAxios.post('/categorys/add', category)

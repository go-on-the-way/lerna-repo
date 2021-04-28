
import axios from 'axios'
import qs from 'qs'

const http = axios.create({
  baseURL: 'http://beta.srm.starlinke.cn/api/v1', //
  timeout: 5 * 60 * 1000 // 请求超时时间5分钟
})

http.interceptors.request.use(config => {
  if (['get', 'delete'].includes(config.method)) {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }
  return config
}, error => {
  Promise.reject(error)
})

http.interceptors.response.use(
  response => {
    let { error } = response.data || {}
    if (error) {
      switch (error.code) {
        default:
          break
      }
    }
    return response.data
  },
  (error) => {
    const { response, config } = error

    let timeout = String(error).indexOf('timeout') > -1
    if (timeout) {

    }
    return Promise.reject(response)
  }
)

export default http

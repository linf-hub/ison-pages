/**
 * 基于 axios 封装的请求模块
 */

import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

//  通过插件机制获取到上下文对象(query,params,req,res,app,store...)
// 插件到处函数必须作为 default 成员
export default ({ store }) => {
  // 请求拦截器
  // 任何请求都要经过拦截器
  // 我们可以在请求拦截器中做一些公共的业务处理，如token
  request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, function (error) {
    // 如果请求没法出去，就会进入这里
    // Do something with request error
    return Promise.reject(error)
  })
  
  // 响应拦截器
  // request.interceptors.response.use(function (response) {
  //   // Any status code that lie within the range of 2xx cause this function to trigger
  //   // Do something with response data
  //   return response
  // }, function (error) {
  //   // Any status codes that falls outside the range of 2xx cause this function to trigger
  //   // Do something with response error
  //   return Promise.reject(error)
  // })
}

import fetch from 'isomorphic-fetch'
import axios from 'axios'
import { prefix, suffix, timeout } from '../config'

const CancelToken = axios.CancelToken
// axios配置
const axiosBaseConfig = (method) => ({
  // baseURL: prefix,
  timeout: timeout,
  headers: {
      'Content-Type': 'application/json'
  },
  method: method,
  // 跨域请求，是否带上认证信息
  // withCredentials: true, // default
  // http返回的数据类型
  // 默认是json，可选'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
  // http请求返回状态码检查
  validateStatus: (status) => {
    return status >= 200 && status < 300 // default
  },
  // 请求数据预处理
  transformRequest: [(data, headers) => {
    // 加入token？
    const token = sessionStorage.getItem('token')
    if (token) {
      data.token = token
    }
    // 请求对象转换成jon字符串
    if (typeof data === 'object') {
      return JSON.stringify(data)
    }
    return data
  }],
  // 返回数据预处理
  transformResponse: [(respData) => {
    // 检查返回status值
    if (typeof respData.status !== 'undefined') {
      if (respData.status === 1) {
        return respData
      }
      throw new Error(respData.errMsg || 'respData.status不为0')
    }
    return respData
  }],
})
// axios 实例
const axiosPostInstance = axios.create(axiosBaseConfig('post'))
const axiosGetInstance = axios.create(axiosBaseConfig('get'))
// 拦截器
axiosPostInstance.interceptors.request.use((req) => {
  return req
}, (error) => {
  // 当请求错误时
  return Promise.reject(error)
})

function axiosPost(url, reqData, target, handleCancel) {
  let newUrl
  if (target) {
    newUrl = `${target}${url}${suffix}`
  } else {
    newUrl = `${prefix}${url}${suffix}`
  }
  return axiosPostInstance.post(newUrl, reqData, {
    cancelToken: handleCancel ? handleCancel.token : undefined,
  })
}

function axiosGet(url, target, handleCancel) {
    let newUrl
    if (target) {
        newUrl = `${target}${url}${suffix}`
    } else {
        newUrl = `${prefix}${url}${suffix}`
    }
    return axiosGetInstance.get(newUrl, {
        cancelToken: handleCancel ? handleCancel.token : undefined,
    })
}

const fetchJSONByPost = (url, target) => (reqData, handleCancel) => axiosPost(url, reqData, target, handleCancel)
const fetchJSONByGet = (url, target) => (reqData, handleCancel) => axiosGet(url, target, handleCancel)

export {
  fetchJSONByPost,
    fetchJSONByGet,
  // axiosBaseConfig,
}

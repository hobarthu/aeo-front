import fetch from 'isomorphic-fetch'
import axios from 'axios'
import { prefix, suffix, timeout } from '../config'

const CancelToken = axios.CancelToken
// axios配置
let config = {
  // baseURL: prefix,
  timeout: timeout,
  headers: {
      'Content-Type': 'application/json'
  },
  method: 'post',
  // 跨域请求，是否带上认证信息
  // withCredentials: true, // default
  // http返回的数据类型
  // 默认是json，可选'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
};
// axios 实例
const axiosPostInstance = axios.create({...config, method: 'post'})
const axiosGetInstance = axios.create({...config, method: 'get'})
const axiosPostFileInstance = axios.create({...config, method: 'post', headers: {'Content-Type': 'multipart/form-data'}})
// 拦截器
axiosPostInstance.interceptors.request.use((req) => {
  return req
}, (error) => {
  // 当请求错误时
  return Promise.reject(error)
})
axiosGetInstance.interceptors.request.use((req) => {
  return req
}, (error) => {
  // 当请求错误时
  return Promise.reject(error)
})
axiosPostFileInstance.interceptors.request.use((req) => {
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

function axiosPostFile(url, reqData, target, handleCancel) {
  let newUrl
  if (target) {
    newUrl = `${target}${url}${suffix}`
  } else {
    newUrl = `${prefix}${url}${suffix}`
  }
  return axiosPostFileInstance.post(newUrl, reqData, {
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

const postFormWithFile = (url, target) => (reqData, handleCancel) => axiosPostFile(url, reqData, target, handleCancel)
const fetchJSONByPost = (url, target) => (reqData, handleCancel) => axiosPost(url, reqData, target, handleCancel)
const fetchJSONByGet = (url, target) => (reqData, handleCancel) => axiosGet(url, target, handleCancel)

export {
  fetchJSONByPost,
  fetchJSONByGet,
  postFormWithFile,
}

import { message } from 'antd'
import { hashHistory } from 'react-router'
import * as ajaxFun from './ajax'
import * as lodash from 'lodash'

export const ajax = ajaxFun
export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

export const createAjaxAction = (httpHandle, startAction, endAction) => (reqData, cb, reject, handleCancel) =>
  (dispatch) => {
    // requet start
    startAction && dispatch(startAction())
    httpHandle(reqData, handleCancel)
      .then((resp) => {
        cb && cb(resp.data)
        endAction && dispatch(endAction({ req: reqData, res: resp.data }))
      })
      .catch((error) => {
        reject(error)
      })
  }

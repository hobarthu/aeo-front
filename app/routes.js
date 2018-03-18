import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import hashHistory from './history'

import App from './base'
import Welcome from './pages/welcome'

// 登录
const Login = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/login').default)
  }, 'login')
}

// 注册
const Register = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/register').default)
  }, 'register')
}

// 创建模板
const CreateTemplate = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/template/create').default)
  }, 'template/create')
}

// 模板列表
const TemplatesList = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/template/list').default)
  }, 'templates')
}

/* 进入路由的判断 */
function isLogin(nextState, replaceState) {
  const token = sessionStorage.getItem('token')
  if (!token) {
    replaceState('/login')
    // hashHistory.push('/login')
  }
}

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={App} onEnter={isLogin}>
      <IndexRoute component={Welcome} />
      <Route path="/template/create" getComponent={CreateTemplate} />
      <Route path="/templates" getComponent={TemplatesList} />
    </Route>
    <Route path="/login" getComponent={Login} />
    <Route path="/register" getComponent={Register} />
  </Router>
)

// export default routes

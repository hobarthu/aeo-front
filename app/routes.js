import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import hashHistory from './history'
import Templates from './pages/template/list'
import Welcome from './pages/welcome'

import App from './base'

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

// 模板详情
const TemplateDetail = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/template/detail').default)
  })
}

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="/template/create" getComponent={CreateTemplate} />
      <Route path="/templates" getComponent={TemplatesList} />
      <Route path="/template/detail/:templateId" getComponent={TemplateDetail} />
    </Route>
  </Router>
)

// export default routes

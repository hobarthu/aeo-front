import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import hashHistory from './history'
import Templates from './pages/template/list'
import Welcome from './pages/welcome'

import App from './base'

// ###模板管理###
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
  }, 'template/list')
}

// 模板详情
const TemplateDetail = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/template/detail').default)
  })
}
// ###模板管理###

// ###立项管理###
// 创建项目
const CreateProject = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/project/create').default)
  })
}

// 项目列表
const ProjectList = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./pages/project/list').default)
  })
}
// ###立项管理###

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="/template/create" getComponent={CreateTemplate} />
      <Route path="/template/list" getComponent={TemplatesList} />
      <Route path="/template/detail/:templateId" getComponent={TemplateDetail} />
      <Route path="/project/create" getComponent={CreateProject} />
      <Route path="/project/list" getComponent={ProjectList} />
    </Route>
  </Router>
)

// export default routes


import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { message } from 'antd'
import 'style/base.less'

import Header from './header'
import LeftNav from './nav'

@connect((state, props) => ({}))
export default class App extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {}
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // antd的message组件 的全局配置
    message.config({
      duration: 3,
    })
  }

  componentWillMount() {
   
  }

  render() {
    const { location, children } = this.props
    return (
      <div id="container" className="effect easeInOutBack mainnav-lg aside-bright">
        <Header />
        <div className="boxed">
          <div id="content-container" className="content-container">
            <div id="page-content">
              {children}
            </div>
            <div id="left-nav-container">
              <LeftNav />
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

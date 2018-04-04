import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import { userInfo } from 'actions/common'

@connect((state, props) => ({
  config: state.config,
}))

export default class welcome extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      data: {},
    }
    // this.getUserInfo = this.getUserInfo.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {

  }

  getUserInfo = () => {
    this.props.dispatch(userInfo({}, (response) => {
      console.log(response)
    }, (response) => {
      message.warning(response)
    }))
  }

  render() {
    return (
      <div className="welcome" style={{'alignSelf': 'center'}}>
        <div className="content">
          <h1 className="title" onClick={() => this.getUserInfo()}>欢迎来到华安平台，祝您工作顺利！</h1>
        </div>
      </div>
    )
  }
}

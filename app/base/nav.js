import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory, Link } from 'react-router'
// import { routerActions } from 'react-router-redux'
import { Menu, Icon, Spin } from 'antd'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

@connect((state, props) => ({
  config: state.config,
}))

export default class LeftNav extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentWillMount() {
    const menu = window.gconfig.nav;
  }

  handleClick = (e) => {
    console.log('click ', e);
    hashHistory.push(e.key)    
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['templates']}
        defaultOpenKeys={['sub1']}
        mode="inline">
        <SubMenu key="sub1" title={<span><Icon type="setting" /><span>模板管理</span></span>}>
            <Menu.Item key="template/create">创建模板</Menu.Item>
            <Menu.Item key="templates">模板列表</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

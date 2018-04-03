import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { message, Table } from 'antd'
import * as _ from 'lodash'
import { LocalStorage } from 'utils/localStorage'

import {
    getTemplatesList,
} from 'actions/template'

const columns = [{
  title: '名称',
  dataIndex: 'name',
  sorter: (a, b) => a.name.length - b.name.length,
}, {
  title: '代号',
  dataIndex: 'code',
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.code - b.code,
}, {
  title: '行业描述',
  dataIndex: 'industry',
  sorter: (a, b) => a.address.length - b.address.length,
}, {
  title: '',
  dataIndex: 'actions',
  render: (text, record) => (
    <span>
      <Link to={"/template/detail/" + record.id}>查看</Link> | <a href="">删除</a>
    </span>
  ),
}];

@connect((state, props) => ({
    config: state.config,
}))

export default class Templates extends Component {

  constructor(props) {
    super(props)
    this.state = {
      templates: []
    }

    this.getTemplates();
  }

  getTemplates = () => {
    this.props.dispatch(getTemplatesList({}, (response) => {
      if (response.success) {
        this.setState({templates: response.data});
      }
    }, (response) => {
      message.warning(response)
    }))
  }

  componentDidMount() {
  }

  render() {
    function onChange(pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter);
    }

    return (
      <div>
        <Table columns={columns} dataSource={this.state.templates} onChange={onChange} />
      </div>
    )
  }
}
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { message, Table } from 'antd'
import * as _ from 'lodash'
import { LocalStorage } from 'utils/localStorage'
import moment from 'moment'

import {
    getTemplatesList,
} from 'actions/template'

const columns = [{
  title: '名称',
  dataIndex: 'name',
  sorter: (a, b) => !a.name || !b.name || a.name.toUpperCase() - b.name.toUpperCase(),
}, {
  title: '代号',
  dataIndex: 'code',
  sorter: (a, b) => !a.code || !b.code || a.code.toUpperCase() - b.code.toUpperCase(),
}, {
  title: '行业',
  dataIndex: 'industry',
  sorter: (a, b) => !a.industry || !b.industry || a.industry.toUpperCase() - b.industry.toUpperCase(),
}, {
  title: '海关文件',
  dataIndex: 'haiguanUrl',
  sorter: false,
}, {
  title: '审计文件',
  dataIndex: 'shengjiUrl',
  sorter: false,
}, {
  title: '创建时间',
  dataIndex: 'createTime',
  sorter: (a, b) => moment(a.createTime).unix() - moment(b.createTime).unix(),
}, {
  title: '更新时间',
  dataIndex: 'updateTime',
  defaultSortOrder: 'descend',
  sorter: (a, b) => moment(a.updateTime).unix() - moment(b.updateTime).unix(),
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
    console.log('moment', moment('2018-04-01 13:55:09').unix());
    super(props)
    this.state = {
      templates: [],
      isLoading: true
    }

    this.getTemplates();
  }

  getTemplates = () => {
    this.props.dispatch(getTemplatesList({}, (response) => {
      if (response.success) {
          this.setState({templates: response.data, isLoading: false});

        // setTimeout(function() {
        //   this.setState({templates: response.data, isLoading: false});
        // }, 3000);
      }
    }, (response) => {
      message.warning(response)
    }))
  }

  render() {
    function onChange(pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter);
    }

    return (
      <div>
        <Table
          rowKey={record => record.id} 
          loading={this.state.isLoading} 
          columns={columns} 
          dataSource={this.state.templates} 
          onChange={onChange} />
      </div>
    )
  }
}
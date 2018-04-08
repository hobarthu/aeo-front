import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Popconfirm, message, Table } from 'antd'
import * as _ from 'lodash'
import { LocalStorage } from 'utils/localStorage'
import moment from 'moment'

import {
    getTemplatesList,
    templates_detail,
    templates_delete,
} from 'actions/template'

class Templates extends Component {

  constructor(props) {
    super(props)
    this.state = {
      templates: [],
      isLoading: true,
      columns: [{
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
        title: '审计文件',
        dataIndex: 'shengjiUrl',
        sorter: false,
        width: 100,
      }, {
        title: '海关文件',
        dataIndex: 'haiguanUrl',
        sorter: false,
        width: 100,
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        defaultSortOrder: 'descend',
        sorter: (a, b) => moment(a.createTime).unix() - moment(b.createTime).unix(),
        width: 110,
      }, {
        title: '更新时间',
        dataIndex: 'updateTime',
        sorter: (a, b) => moment(a.updateTime).unix() - moment(b.updateTime).unix(),
        width: 110,
      }, {
        title: '',
        dataIndex: 'actions',
        render: (text, record) => (
          <span>
            <Link to={"/template/detail/" + record.id}>查看</Link> |&nbsp;
            <Popconfirm 
              title={'确定删除模板?'} 
              onConfirm={() => {this.props.deleteTemplate(record.id, this.getTemplates)}}
              okText="确定" cancelText="取消">
              <a href="">删除</a>
            </Popconfirm>
          </span>
        ),
        width: 100,
      }]
    }

    this.getTemplates();
  }

  getTemplates = () => {
    this.props.getTemplates((response) => {
      if (response.success) {
          this.setState({templates: response.data, isLoading: false});
      }
    }, (response) => {
      message.warning(response)
    });
  }

  render() {
    return (
      <div>
        <Table
          rowKey={record => record.id} 
          loading={this.state.isLoading} 
          columns={this.state.columns} 
          dataSource={this.state.templates}
          />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTemplates: (successHandler, errorHandler) => {
      dispatch(getTemplatesList({}, successHandler, errorHandler));
    },
    deleteTemplate: (id, successHandler) => {
      dispatch(templates_delete({id})).then((response) => {        
        response.data.success && successHandler();
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { message, Table } from 'antd'
import * as _ from 'lodash'
import { LocalStorage } from 'utils/localStorage'
import moment from 'moment'

import {
  project_list,
  project_detail,
} from 'actions/project'

import {
  options,
  treeData,
} from 'containers/project-form'

class ProjectList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      isLoading: true,
      columns: [{
        title: '公司',
        dataIndex: 'companyName',
        sorter: (a, b) => !a.companyName || !b.companyName || a.companyName.toUpperCase() - b.companyName.toUpperCase(),
      }, {
        title: '年份',
        dataIndex: 'year',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.year > b.year,
      }, {
        title: '业务种类',
        dataIndex: 'companyCategory',
        sorter: (a, b) => !a.companyCategory || !b.companyCategory || a.companyCategory.toUpperCase() - b.companyCategory.toUpperCase(),
        render: (text, record, index) => {
          let list = record.companyCategory && record.companyCategory.split(',') || [];
          let displayList = []; 
          _.map(options, (item) => {
            if (list.indexOf(item.value) != -1) {
              displayList = displayList.concat([item.label]);
            }
          });
          return !_.isEmpty(displayList) && displayList.join(', ') || '';
        }
      }, {
        title: '委托类型',
        dataIndex: 'aeoCategory',
        sorter: (a, b) => !a.aeoCategory || !b.aeoCategory || a.aeoCategory.toUpperCase() - b.aeoCategory.toUpperCase(),
        render: (text, record, index) => {
          var displayStr = '';
          if (record.aeoCategory == 'kehu') {
            displayStr = '客户委托';
          } else if (record.aeoCategory == 'haiguan') {
            displayStr = '海关委托';
          }
          return displayStr;
        }
      }, {
        title: '信用等级',
        dataIndex: 'creditRating',
        sorter: false,
        render: (text, record, index) => {
          let displayList = [];
          let node = _.find(treeData, {value: record.certificateType});
          if (node) {
            displayList = displayList.concat([node.label]);
            let child = _.find(node.children, {value: record.certificateTypeCategory});
            child && (displayList = displayList.concat([child.label]));
          }
          return !_.isEmpty(displayList) && displayList.join(', ') || '';
        }
      }, 
      
      // {
      //   title: '创建时间',
      //   dataIndex: 'createTime',
      //   sorter: (a, b) => moment(a.createTime).unix() - moment(b.createTime).unix(),
      // }, {
      //   title: '更新时间',
      //   dataIndex: 'updateTime',
      //   defaultSortOrder: 'descend',
      //   sorter: (a, b) => moment(a.updateTime).unix() - moment(b.updateTime).unix(),
      // }, 
      
      {
        title: '',
        dataIndex: 'actions',
        render: (text, record) => (
          <span>
            <Link to={"/project/detail/" + record.id} onClick={() => {this.props.goToDetail(record.id)}}>查看</Link> | <a href="">删除</a>
          </span>
        ),
      }]
    }

    this.getProjects();
  }

  getProjects = () => {
    this.props.getProjects((response) => {
      console.log('res', response);
      if (response.success) {
        this.setState({projects: response.data, isLoading: false});
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
          dataSource={this.state.projects} 
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
    getProjects: (successHandler, errorHandler) => {
      dispatch(project_list({}, successHandler, errorHandler));
    },
    goToDetail: (id) => {
      dispatch(project_detail(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Popconfirm, message, Table } from 'antd'
import * as _ from 'lodash'
import { ProjectService } from 'utils/commonService'
import moment from 'moment'

import {
  project_list,
  project_delete,
} from 'actions/project'

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
        render: (text, record, index) => ProjectService.getCompanyCategory(record)
      }, {
        title: '委托类型',
        dataIndex: 'aeoCategory',
        sorter: (a, b) => !a.aeoCategory || !b.aeoCategory || a.aeoCategory.toUpperCase() - b.aeoCategory.toUpperCase(),
        render: (text, record, index) => ProjectService.getAeoCategory(record)
      }, {
        title: '信用等级',
        dataIndex: 'creditRating',
        sorter: false,
        render: (text, record, index) => ProjectService.getCreditRating(record)
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
            <Link to={"/project/detail/" + record.id}>查看</Link> | &nbsp;
            <Popconfirm 
              title={'确定删除项目?'} 
              onConfirm={() => {this.props.deleteProject(record.id, this.getProjects)}}
              okText="确定" cancelText="取消">
              <a href="">删除</a>
            </Popconfirm>
          </span>
        ),
      }]
    }

    this.getProjects();
  }

  getProjects = () => {
    this.props.getProjects((response) => {
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
    deleteProject: (id, successHandler) => {
      dispatch(project_delete({id})).then((response) => {        
        response.data.success && successHandler();
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
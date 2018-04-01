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
      var storedtemplates = JSON.parse(LocalStorage.getItem("templates"));
      var templates = !_.isEmpty(storedtemplates) && storedtemplates || [];
      this.setState({templates: templates.concat(response.data.list)});
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

  /**
   * 
   * 
   * 对某一列数据进行筛选，使用列的 filters 属性来指定需要筛选菜单的列，onFilter 用于筛选当前数据，filterMultiple 用于指定多选和单选。
对某一列数据进行排序，通过指定列的 sorter 函数即可启动排序按钮。sorter: function(a, b) { ... }， a、b 为比较的两个列数据。
使用 defaultSortOrder 属性，设置列的默认排序顺序。
expand codeexpand code
Create New Pen with Prefilled DataCreate New Sandbox with Prefilled Data
import { Table } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  filters: [{
    text: 'Joe',
    value: 'Joe',
  }, {
    text: 'Jim',
    value: 'Jim',
  }, {
    text: 'Submenu',
    value: 'Submenu',
    children: [{
      text: 'Green',
      value: 'Green',
    }, {
      text: 'Black',
      value: 'Black',
    }],
  }],
  // specify the condition of filtering result
  // here is that finding the name started with `value`
  onFilter: (value, record) => record.name.indexOf(value) === 0,
  sorter: (a, b) => a.name.length - b.name.length,
}, {
  title: 'Age',
  dataIndex: 'age',
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.age - b.age,
}, {
  title: 'Address',
  dataIndex: 'address',
  filters: [{
    text: 'London',
    value: 'London',
  }, {
    text: 'New York',
    value: 'New York',
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.address.indexOf(value) === 0,
  sorter: (a, b) => a.address.length - b.address.length,
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

ReactDOM.render(
  <Table columns={columns} dataSource={data} onChange={onChange} />
, mountNode);
   */
}
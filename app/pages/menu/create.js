
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Tooltip, Button, Spin, Form, Input, Table, Select, Collapse } from 'antd'
import 'style/create.less'
import * as _ from 'lodash'
import { AeoButton } from '../index'

import {
  fetchHouseCheckList,
} from 'actions/house'

if (process.env.NODE_ENV === 'development') {
  console.log('development')
}

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

const Option = Select.Option;
const Panel = Collapse.Panel;

@Form.create({})
@connect((state, props) => ({}),)

export default class app extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstCategories: [],
      selectedCategory: {}
    }
  }

  check = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          console.info('success');
        }
      },
    );
  }

  addFirstCategory = () => {
    if (_.isEmpty(this.state.selectedCategory)) {
      return;
    }

    this.setState((prevState, props) => ({
      firstCategories: prevState.firstCategories.concat([{...prevState.selectedCategory, key: prevState.selectedCategory.key + prevState.firstCategories.length}])
    }));

    console.log('state:', this.state);
  }

  deleteFirstCategory = (category) => {
    console.log('category', category);
    let item = _.find(this.state.firstCategories, {key: category.key});

    if (!item) {
      return;
    }

    this.setState((prevState, props) => ({
      firstCategories: _.without(this.state.firstCategories, item)
    }));

    console.log('state:', this.state);
  }

  handleChange = (value) => {
    console.log("value", value);
    this.setState({selectedCategory: value});
  }

  componentDidMount() {
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const categoryItems = this.state.firstCategories.map((category, index) => {
      return (
        <FormItem className="first-category" {...formTailLayout} key={category.key}>
          <Collapse style={{ width: '100%' }}>
            <Panel header={category.label}>
              <p>{category.label}</p>
            </Panel>
          </Collapse>
          <AeoButton
            btnObj={
              {
                name: "删除",
                btnClassName: 'delete-button', 
                disable: false,
                clickFunParams: category,
              }
            } clickFun={this.deleteFirstCategory}/>
        </FormItem>
      )
    })

    return (
      <div className="create-form">
        <FormItem {...formItemLayout} label="名称：">
          {getFieldDecorator('name', {
            rules: [{
              required: true,
              message: '请输入模板名称',
            }],
          })(
            <Input placeholder="请输入模板名称" />
          )}
        </FormItem>
        <FormItem className="first-category" {...formItemLayout} label="一级分类：">
          {getFieldDecorator('first-category', {
            rules: [{
              required: this.state.checkNick,
              message: '请添加一级分类',
            }],
          })(
            <Select
              labelInValue 
              showSearch
              style={{ width: '100%' }}
              placeholder="请添加一级分类"
              optionFilterProp="children"
              onChange={this.handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="node">节点信息</Option>
              <Option value="folder">文件夹信息</Option>
              <Option value="helpText">提示信息</Option>
              <Option value="auditContentReplace">审计文字替换信息</Option>
              <Option value="customsContentReplace">海关文字替换信息</Option>
            </Select>
          )}
          <AeoButton
            btnObj={
              {
                name: "添加",
                btnClassName: 'add-button', 
                disable: _.isEmpty(this.state.selectedCategory),
                tooltip: "请选择一级分类"
              }
            } clickFun={this.addFirstCategory}/>
        </FormItem>
        {categoryItems}
        <FormItem {...formTailLayout}>
          <Button type="primary" onClick={this.check}>
            创建
          </Button>
        </FormItem>
        
      </div>
    )
  }
}

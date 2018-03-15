
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Spin, Form, Input, Table, Select, Collapse } from 'antd'
import 'style/create.less'
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
    this.setState((prevState, props) => ({
      firstCategories: prevState.firstCategories.concat([prevState.selectedCategory])
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
    const categoryItems = this.state.firstCategories.map((category) => {
      return (
        <FormItem {...formTailLayout}>
          <Collapse>
            <Panel header={category.label} key={category.key}>
              <p>{category.label}</p>
            </Panel>
          </Collapse>
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
              style={{ width: 300 }}
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
          <Button className="add-button" onClick={this.addFirstCategory}>添加</Button>
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

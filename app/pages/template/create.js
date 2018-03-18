import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Tooltip, Button, Spin, Form, Input, Table, Select, Collapse } from 'antd'
import 'style/create.less'
import * as _ from 'lodash'

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
const { TextArea } = Input;

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

  create = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          console.info('success');
        }
      },
    );
  }

  componentDidMount() {
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
        <FormItem {...formItemLayout} label="代号：">
          {getFieldDecorator('code', {
            rules: [{
              required: true,
              message: '请输入模板代号',
            }],
          })(
            <Input placeholder="请输入模板代号" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="行业描述：">
          {getFieldDecorator('industry', {
            rules: [{
              required: true,
              message: '请输入模板行业描述',
            }],
          })(
            <TextArea rows={4} placeholder="请输入模板行业描述" />
          )}
        </FormItem>
        <FormItem style={{textAlign: 'right'}} {...formTailLayout}>
          <Button type="primary" onClick={this.create}>
            创建
          </Button>
        </FormItem>
        
      </div>
    )
  }
}

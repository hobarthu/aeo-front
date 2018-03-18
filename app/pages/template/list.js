import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Tooltip, Button, Spin, Form, Input, Table, Select, Collapse } from 'antd'
import 'style/create.less'
import * as _ from 'lodash'

import {
    getTemplatesList,
    fetchTemplatesList
} from 'actions/template'

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
@connect((state, props) => ({
    config: state.config,
}))

export default class app extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstCategories: [],
      selectedCategory: {}
    }

    this.getTemplates();
  }

  getTemplates = () => {
    console.log('aaaa');
    this.props.dispatch(fetchTemplatesList({}, (response) => {
      console.log(response)
    }, (response) => {
      message.warning(response)
    }))
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
    return (
      <div className="create-form">
        
        啊啊啊啊啊
      </div>
    )
  }
}
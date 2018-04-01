import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message, Tooltip, Button, Spin, Form, Input, Table } from 'antd'
import * as _ from 'lodash'
import { LocalStorage } from 'utils/localStorage'

import {
    createTemplate
  } from 'actions/template'

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

const { TextArea } = Input;

@Form.create({
    mapPropsToFields: (props) => {
        return {
            name: Form.createFormField({value: props.template.name}),
        }
    }
})

class TemplateForm extends Component {
    create = () => {
        this.props.form.validateFields(
            (err) => {
            if (!err) {
                console.info('success');
                
                var params = {
                    name: this.props.form.getFieldValue("name"),
                    code: this.props.form.getFieldValue("code"),
                    industry: this.props.form.getFieldValue("industry"),       
                };
                this.props.create(params);
                // this.props.dispatch(createTemplate(params, (response) => {
                // var storedtemplates = JSON.parse(LocalStorage.getItem("templates"));
                // var templates = !_.isEmpty(storedtemplates) && storedtemplates || [];            
                // LocalStorage.setItem("templates", JSON.stringify(templates.concat([{...params, id: response.data.id}])));
                this.props.form.resetFields();
                message.info("模板 " + params.name + " 创建成功！");
                // }, (response) => {
                // message.warning(response)
                // }))
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
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

function mapStateToProps(state) {
    console.log('state', state);
    return {
      visible: state.editTemplateForm.visible
    }
  }
  
  function mapDispatchToProps(dispatch, ownProps) {
    return {
      create: (params) => {
          console.log('mapDispatchToProps', params);
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm);
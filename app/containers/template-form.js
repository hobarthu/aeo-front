import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message, Tooltip, Button, Spin, Form, Input, Table } from 'antd'
import * as _ from 'lodash'
import { LocalStorage } from 'utils/localStorage'

import {
    createTemplate,
    editTemplateForm_save,
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
            code: Form.createFormField({value: props.template.code}),
            industry: Form.createFormField({value: props.template.industry}),
        }
    }
})

class TemplateForm extends Component {
    create = () => {
        this.props.form.validateFields(
            (err) => {
            if (!err) {
                let params = new FormData();
                params.append('name', this.props.form.getFieldValue("name"));
                params.append('code', this.props.form.getFieldValue("code"));
                params.append('industry', this.props.form.getFieldValue("industry"));

                this.props.isEditMode && (params.append('industry', this.props.template.id));
                this.props.create(params, (response) => {
                    console.log('长江', response);
                        this.props.form.resetFields();
                        message.info("模板 " + params.name + " 创建成功！");
                    }, (response) => {
                        message.warning(response)
                    });
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
                {this.props.isEditMode && 
                <FormItem style={{textAlign: 'right'}} {...formTailLayout}>
                    <Button style={{marginRight: '10px'}} type="primary" onClick={this.create}>
                        取消
                    </Button>
                    <Button type="primary" onClick={this.create}>
                        保存
                    </Button>
                </FormItem>
                }
                {!this.props.isEditMode &&
                <FormItem style={{textAlign: 'right'}} {...formTailLayout}>
                    <Button type="primary" onClick={this.create}>
                        创建
                    </Button>
                </FormItem>
                }
            </div>
            )
    }
}

function mapStateToProps(state) {
    return state;
}
  
function mapDispatchToProps(dispatch, ownProps) {
    return {
        create: (params, successHandler, errorHandler) => {
            if (ownProps.isEditMode) {
                dispatch(editTemplateForm_save(params, (response) => {
                    console.log('跟新', response);
                        // this.props.form.resetFields();
                        message.info("模板保存成功！");
                    }, (response) => {
                        message.warning(response)
                    })
                );
            } else {
                dispatch(createTemplate(params, successHandler, errorHandler));
            }      
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm);
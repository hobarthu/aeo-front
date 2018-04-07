import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Upload, Icon, message, Tooltip, Button, Spin, Form, Input, Table } from 'antd'
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
        console.log("11", this);

        const shengjiFile = new File([""], props.template.shengjiUrl);
        const haiguanFile = new File([""], props.template.haiguanUrl);
        
        if (!_.isEmpty(props.template)) {
            return {
                name: Form.createFormField({value: props.template.name}),
                code: Form.createFormField({value: props.template.code}),
                industry: Form.createFormField({value: props.template.industry}),
                shengjiUrl: Form.createFormField({value: {file: shengjiFile, fileList: [shengjiFile]}}),
                haiguanUrl: Form.createFormField({value: {file: haiguanFile, fileList: [haiguanFile]}}),
            };
        } else {
            return {};
        }
    }
})

class TemplateForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            haiguanFileList: [{
                uid: -1,
                name: props.template.haiguanUrl,
                status: 'done',
                url: '',
              }],
            shengjiFileList: [{
                uid: -2,
                name: props.template.shengjiUrl,
                status: 'done',
                url: '',
              }],
        }     
    }

    create = () => {
        this.props.form.validateFields(
            (err) => {
            if (!err) {
                let params = new FormData();
                params.append('name', this.props.form.getFieldValue("name"));
                params.append('code', this.props.form.getFieldValue("code"));
                params.append('industry', this.props.form.getFieldValue("industry"));
                params.append('shengjiFile', this.props.form.getFieldValue("shengjiFile").file);
                params.append('haiguanFile', this.props.form.getFieldValue("haiguanFile").file);

                console.log(this.props.form.getFieldValue("haiguanFile"));

                // if (this.props.isEditMode) {
                //     params.append('id', this.props.template.id);
                //     this.props.create(params, (response) => {
                //         message.info("模板更新成功！");
                //         this.props.refreshTemplateDetail();
                //     }, (response) => {
                //         message.warning(response)
                //     });
                // } else {
                //     this.props.create(params, (response) => {
                //         this.props.form.resetFields();
                //         this.setState({haiguanFileList: [], shengjiFileList: [],});
                //         message.info("模板创建成功！");
                //     }, (response) => {
                //         message.warning(response)
                //     });
                // }          
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const haiguanFileOptions = {
            onRemove: (file) => {
              this.setState(({ haiguanFileList }) => {
                const index = haiguanFileList.indexOf(file);
                const newFileList = haiguanFileList.slice();
                newFileList.splice(index, 1);
                return {
                    haiguanFileList: newFileList,
                };
              });
            },
            beforeUpload: (file) => {
              this.setState(({ haiguanFileList }) => ({
                haiguanFileList: [...haiguanFileList, file],
              }));
              return false;
            },
            multiple: false,
            fileList: this.state.haiguanFileList,
            defaultFileList: this.state.haiguanFileList
        };

        const shengjiFileOptions = {
            onRemove: (file) => {                
              this.setState(({ shengjiFileList }) => {
                const index = shengjiFileList.indexOf(file);
                const newFileList = shengjiFileList.slice();
                newFileList.splice(index, 1);
                return {
                    shengjiFileList: newFileList,
                };
              });
            },
            beforeUpload: (file) => {
              this.setState(({ shengjiFileList }) => ({
                shengjiFileList: [...shengjiFileList, file],
              }));
              return false;
            },
            multiple: false,
            fileList: this.state.shengjiFileList,
            defaultFileList: this.state.shengjiFileList
        };

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
                <FormItem {...formItemLayout} label="审计文件：">
                {getFieldDecorator('shengjiFile', {
                    rules: [{
                    required: true,
                    message: '请添加审计文件',
                    }],
                })(
                    <Upload {...shengjiFileOptions} 
                        disabled={this.state.shengjiFileList.length>0}
                        >
                        <Button>    
                        <Icon type="upload" /> 选择文件
                        </Button>
                    </Upload>
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="海关文件：">
                {getFieldDecorator('haiguanFile', {
                    rules: [{
                    required: true,
                    message: '请添加海关文件',
                    }],
                })(
                    <Upload {...haiguanFileOptions} disabled={this.state.haiguanFileList.length>0}>
                        <Button>
                        <Icon type="upload" /> 选择文件
                        </Button>
                    </Upload>
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
                dispatch(editTemplateForm_save(params, successHandler, errorHandler));
            } else {
                dispatch(createTemplate(params, successHandler, errorHandler));
            }      
        },
        refreshTemplateDetail: () => {
            dispatch(templateDetail_get({id: ownProps.template.id})).then((response) => {
                if (response.data.success) {
                    dispatch(templateDetail_receive(response.data))
                }
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm);
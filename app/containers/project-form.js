import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TreeSelect, Checkbox, Select, message, Tooltip, Button, Spin, Form, Input, Table } from 'antd'
import * as _ from 'lodash'
import { LocalStorage } from 'utils/localStorage'

import {
    project_create,
    editProjectForm_save,
    projectDetail_get,
    projectDetail_receive,
  } from 'actions/project'

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
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

export const options = [
    { label: '报关', value: 'baoguan' },
    { label: '仓储', value: 'cangchu' },
    { label: '运输', value: 'yunshu' },
    { label: '贸易', value: 'maoyi' },
    { label: '生产', value: 'shengchan' },
];

export const treeData = [{
    label: '高级认证',
    value: '0-0',
    key: '0-0',
    children: [{
        label: '复核验证',
        value: '0-0-1',
        key: '0-0-1',
    }, {
        label: '升级验证',
        value: '0-0-2',
        key: '0-0-2',
    }],
}, {
    label: '一般认证',
    value: '0-1',
    key: '0-1',
    children: [{
        label: '复核验证',
        value: '0-1-1',
        key: '0-1-1',
    }, {
        label: '升级验证',
        value: '0-1-2',
        key: '0-1-2',
    }],
}];

function prepareCompanyCategory(companyCategory) {
    if (_.isEmpty(companyCategory)) {
        return [];
    } else {
        return props.project.companyCategory.split(',');
    }
}

@Form.create({
    mapPropsToFields: (props) => {
        if (props.isEditMode && !_.isEmpty(props.project)) {
            return {
                companyName: Form.createFormField({value: props.project.companyName}),
                year: Form.createFormField({value: props.project.year}),
                companyCategory: Form.createFormField({value: !_.isEmpty(props.project.companyCategory) && props.project.companyCategory.split(',') || []}),
                aeoCategory: Form.createFormField({value: props.project.aeoCategory}),
                creditRating: Form.createFormField({value: props.project.creditRating}),
            };
        } else {
            return {};
        }
    }
})

class ProjectForm extends Component {
    create = () => {
        this.props.form.validateFields(
            (err) => {
            if (!err) {
                let params = {
                    companyName: this.props.form.getFieldValue("companyName"),
                    year: this.props.form.getFieldValue("year"),
                    companyCategory: this.props.form.getFieldValue("companyCategory").join(','),
                    aeoCategory: this.props.form.getFieldValue("aeoCategory"),
                    creditRating: this.props.form.getFieldValue("creditRating"),
                    certificateType: this.props.form.getFieldValue("creditRating").substring(0,3),
                    certificateTypeCategory: this.props.form.getFieldValue("creditRating"),
                };

                if (this.props.isEditMode) {
                    params.id = this.props.project.id;
                    this.props.create(params, (response) => {
                        message.info("项目更新成功！");
                        this.props.refreshProjectDetail();
                    }, (response) => {
                        message.warning(response)
                    });
                } else {
                    this.props.create(params, (response) => {
                        this.props.form.resetFields();
                        message.info("项目创建成功！");
                    }, (response) => {
                        message.warning(response)
                    });
                }                
            }
            
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <FormItem {...formItemLayout} label="公司名称：">
                {getFieldDecorator('companyName', {
                    rules: [{
                    required: true,
                    message: '请输入公司名称',
                    }],
                })(
                    <Input placeholder="请输入公司名称" />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="年份：">
                {getFieldDecorator('year', {
                    rules: [{
                    required: true,
                    message: '请选择年份',
                    }],
                })(
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择年份"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="2018">2018</Option>
                        <Option value="2019">2019</Option>
                        <Option value="2020">2020</Option>
                        <Option value="2021">2021</Option>
                        <Option value="2022">2022</Option>
                    </Select>
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="公司业务种类：">
                {getFieldDecorator('companyCategory', {
                    rules: [{
                    required: true,
                    message: '请选择业务种类',
                    }],
                })(
                    <CheckboxGroup options={options} />
                )}
                </FormItem> 
                <FormItem {...formItemLayout} label="委托类型：">
                {getFieldDecorator('aeoCategory', {
                    rules: [{
                    required: true,
                    message: '请选择委托类型',
                    }],
                })(
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择委托类型"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="kehu">客户委托</Option>
                        <Option value="haiguan">海关委托</Option>
                    </Select>
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="海关信用等级：">
                {getFieldDecorator('creditRating', {
                    rules: [{
                    required: true,
                    message: '请选择认证类型',  
                    }],
                })(
                    <TreeSelect
                        style={{ width: 300 }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeData}
                        placeholder="请选择认证类型"
                        treeDefaultExpandAll
                    />
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
            dispatch(editProjectForm_save(params, successHandler, errorHandler));
        } else {
            dispatch(project_create(params, successHandler, errorHandler));
        }
    },
    refreshProjectDetail: () => {
        dispatch(projectDetail_get({id: ownProps.project.id})).then((response) => {
            if (response.data.success) {
                dispatch(projectDetail_receive(response.data))
            }
        })
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
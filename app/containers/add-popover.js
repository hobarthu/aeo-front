import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'
import { connect } from 'react-redux'
import 'style/template.less'
import {
  AddPopover_save,
  AddPopover_cancel,
} from 'actions/template'

const FormItem = Form.Item;

@Form.create({})
class AddPopover extends React.Component {

  save = () => {
    this.props.form.validateFields((err) => {
      if (!err) {
        console.info('success', this.props.form.getFieldValue("name"));
        this.props.handleOk(this.props.form.getFieldValue("name"));
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={this.props.visible}
          onOk={this.save}
          onCancel={this.props.handleCancel}
          cancelText="取消"
          okText="保存"
        >
          <FormItem label="名称：">
            {getFieldDecorator('name', {
                rules: [{
                required: true,
                message: '请输入名称',
                }],
            })(
                <Input placeholder="请输入名称" />
            )}
          </FormItem>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    visible: state.AddPopover && state.AddPopover.visible
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleOk: (name) => {
      dispatch(AddPopover_save());
      ownProps.save(name, ownProps.parentId);
      console.log("ownProps", ownProps);
      
    },
    handleCancel: () => dispatch(AddPopover_cancel()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPopover)
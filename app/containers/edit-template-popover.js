import React, { Component } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import 'style/template.less'
import {
  editTemplateForm_save,
  editTemplateForm_cancel,
} from 'actions/template'

import TemplateForm from 'containers/template-form'

class EditTemplatePopover extends React.Component {
  render() {
    return (
      <div>
        <Modal
          title="模板编辑"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          cancelText="取消"
          okText="保存"
          footer={null}
        >
          {this.props.visible && <TemplateForm isEditMode={true} template={this.props.template} />}
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    visible: state.editTemplateForm.visible
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleOk: () => dispatch(editTemplateForm_save()),
    handleCancel: () => dispatch(editTemplateForm_cancel()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTemplatePopover)
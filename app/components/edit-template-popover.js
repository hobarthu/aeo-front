import React, { Component } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import 'style/template.less'
import {
  editTemplateForm_save,
  editTemplateForm_cancel,
} from 'actions/template'

import TemplateForm from 'components/template-form'

class EditTemplatePopover extends React.Component {
  render() {
    return (
      <div>
        <Modal
          title="模板编辑"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}>
          <TemplateForm isEditMode={true} template={{}} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    visible: state.editTemplateForm.visible
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleOk: () => dispatch(editTemplateForm_save()),
    handleCancel: () => dispatch(editTemplateForm_cancel()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTemplatePopover)
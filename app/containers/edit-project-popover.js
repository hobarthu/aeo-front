import React, { Component } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import {
  editProjectForm_save,
  editProjectForm_cancel,
} from 'actions/project'
import 'style/project.less'


import ProjectForm from 'containers/project-form'

class EditProjectPopover extends React.Component {
  render() {
    return (
      <div>
        <Modal
          title="項目编辑"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          cancelText="取消"
          okText="保存"
          footer={null}
          width={750}
        >
          <ProjectForm isEditMode={true} project={this.props.project} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    visible: state.editProjectForm.visible
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleOk: () => dispatch(editProjectForm_save(), (response) => {
      console.log("jj", response);
    }),
    handleCancel: () => dispatch(editProjectForm_cancel()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectPopover)
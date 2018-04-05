import React, { Component } from 'react'
import 'style/create.less'
import ProjectForm from 'containers/project-form'

export default class CreateProject extends Component {
  render() {
    return (
      <div className="create-form">
        <ProjectForm isEditMode={false} project={{}} />
      </div>
    )
  }
}
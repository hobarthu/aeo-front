import React, { Component } from 'react'
import 'style/template.less'
import TemplateForm from 'containers/template-form'

export default class CreateTemplate extends Component {
  render() {
    return (
      <div className="create-form">
        <TemplateForm isEditMode={false} template={{}} />
      </div>
    )
  }
}
import React, { Component } from 'react'
import 'style/create.less'
import TemplateForm from 'components/template-form'


export default class CreateTemplate extends Component {

  render() {
    return (
      <div className="create-form">
        <TemplateForm isEditMode={false} template={{}} />
      </div>
    )
  }
}
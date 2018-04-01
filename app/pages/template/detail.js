import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Icon, List, Card, message, Tooltip, Button, Spin, Form, Input, Table } from 'antd'
import 'style/template.less'
import EditTemplatePopover from 'components/edit-template-popover'

import {
  getTemplateDetail,
  editTemplateForm_open,
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

var _getTemplateDetailFields = (template) => {
  var fields = [];
  _.forEach(template, function(value, key) {
    switch (key) {
      case 'name':
        fields = fields.concat([{title: "名称", content: value}]);
        break;
      case 'code':        
        fields = fields.concat([{title: "代号", content: value}]);
        break;
      case 'industry':               
        fields = fields.concat([{title: "行业", content: value}]);
        break;
      default:
        break;
    }
  });
  return fields;
}

@Form.create({})
@connect((state, props) => ({}),)

export default class TemplateDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      template: {},
      templateFields: [],
      showEditTemplate: false
    }

    this.getTemplateDetail();
  }

  

  getTemplateDetail = () => {
    this.props.dispatch(getTemplateDetail({}, (response) => {
      var response = JSON.parse(response);
      var template =  {
        id: response.data.id,
        name: response.data.name,
        code: response.data.code,
        industry: response.data.industry
      };
      this.setState({
        template: template,
        templateFields: _getTemplateDetailFields(template)
      });

      this.props.form.setFieldsValue({
        name: this.state.template.name,
        code: this.state.template.code,
        industry: this.state.template.industry,
      });

    }, (response) => {
      message.warning(response)
    }))
  }

  edit = () => {
    this.props.dispatch(editTemplateForm_open());
  }

  hover = () => {

  }

  save = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          console.info('success');
          var params = {
            name: this.props.form.getFieldValue("name"),
            code: this.props.form.getFieldValue("code"),
            industry: this.props.form.getFieldValue("industry"),       
          };
          message.info("模板 " + params.name + " 保存成功！");
          this.setState({
            isEditMode: false
          });
        }
      }
    );
  }

  render() {
    const TemplateDetail = () => {
      return (
        <Card title="模板描述" type="inner" extra={<a><Icon type="edit" onClick={this.edit} /></a>}>
          <List
            itemLayout="horizontal"
            dataSource={this.state.templateFields}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </Card>
      )
    }

    return (
      <div className="detail-container">
        <TemplateDetail />
        <EditTemplatePopover template={this.state.template}/>
      </div>
    )
  }
}

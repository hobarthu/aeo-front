import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Icon, List, Card, message, Tooltip, Button, Spin, Form, Input, Table } from 'antd'
import 'style/template.less'
import EditTemplatePopover from 'components/edit-template-popover'

import {
  templateDetail_get,
  templateDetail_receive,
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

class TemplateDetail extends Component {

  constructor(props) {
    super(props)
    this.props.getTemplateDetail(props.routeParams.templateId);
  }

  render() {
    const TemplateDetail = () => {
      return (
        <Card title="模板描述" type="inner" extra={<a><Icon type="edit" onClick={this.props.edit} /></a>}>
          <List
            itemLayout="horizontal"
            dataSource={this.props.templateFields}
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
        <EditTemplatePopover template={this.props.template}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('aaaaaa', this.state, this.props);

  return {
    template: state.getTemplateDetail.template,
    templateFields: _getTemplateDetailFields(state.getTemplateDetail.template)
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getTemplateDetail: (id) => {
      dispatch(templateDetail_get({id})).then((response) => {
        if (response.data.success) {
          dispatch(templateDetail_receive(response.data))
        }
      })
    },
    edit: () => {
      dispatch(editTemplateForm_open());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateDetail);

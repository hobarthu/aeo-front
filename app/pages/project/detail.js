import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Icon, List, Card, message, Tooltip, Button, Spin, Form, Input, Table } from 'antd'
import 'style/template.less'
import EditTemplatePopover from 'containers/edit-template-popover'
import AddPopover from 'containers/add-popover'
import * as _ from 'lodash'

import {
  templateDetail_get,
  templateDetail_receive,
  templateDetail_saveFirstCategory,
  templateDetail_getFirstCategories,
  editTemplateForm_open,
  AddPopover_open,
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
    this.props.getFirstCategories(props.routeParams.templateId)
  }

  render() {
    const Detail = () => {
      return (
          <Card title="模板描述" type="inner" extra={<a><Icon type="edit" onClick={this.props.edit} /></a>}>
            <List
              itemLayout="horizontal"
              dataSource={this.props.templateFields}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={item.content}/>
                </List.Item>
              )}
            />
          </Card>
      )
    }

    const Category = () => {
      return (
        <div>
          <Card title="分类: " type="inner" extra={<a><Icon type="plus" onClick={this.props.addFirstCategory} /></a>}>
            <FirstCategories />
          </Card>
          <AddPopover title='添加一级分类' save={this.props.saveFirstCategory} />
        </div>
      )
    } 

    const FirstCategories = () => (
      _.map(this.props.firstCategories, (item) => {
        return (
          <Card key={item.id} title={item.name} type="inner" extra={<a><Icon type="plus" /></a>}></Card>
        )
    }));

    return (
      <div className="detail-container">
        <Detail />
        <EditTemplatePopover template={this.props.template}/>
        <Category />
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  
  return {
    template: state.getTemplateDetail.template,
    templateFields: _getTemplateDetailFields(state.getTemplateDetail.template),
    firstCategories: state.getTemplateDetail.firstCategories,
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
    addFirstCategory: () => {
      dispatch(AddPopover_open());
    },
    saveFirstCategory: (name) => {
      let params = {
        templateId: ownProps.routeParams.templateId,
        name,
      };
      dispatch(templateDetail_saveFirstCategory(params, (response) => {
        if (response.success) {
          let criteria = {
            "oredCriteria": [
              {
                "criteria": [
                  {
                    "condition": "template_id=",
                    "singleValue":true,
                    "value": ownProps.routeParams.templateId
                  }
                ]
              }
            ]
          };
          dispatch(templateDetail_getFirstCategories(criteria));
        }
      }))
    },
    getFirstCategories: (id) => {
      let criteria = {
        "oredCriteria": [
          {
            "criteria": [
              {
                "condition": "template_id=",
                "singleValue":true,
                "value": id
              }
            ]
          }
        ]
      };
      dispatch(templateDetail_getFirstCategories(criteria));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateDetail);

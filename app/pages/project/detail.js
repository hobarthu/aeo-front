import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Icon, List, Card, message, Tooltip, Button, Spin, Form, Input, Table } from 'antd'
import EditProjectPopover from 'containers/edit-project-popover'
import * as _ from 'lodash'
import { ProjectService } from 'utils/commonService'

import {
  projectDetail_get,
  projectDetail_receive,
  editProjectForm_open,
} from 'actions/project'

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

var _getProjectDetailFields = (project) => {
  var fields = [];
  _.forEach(project, function(value, key) {
    switch (key) {
      case 'companyName':
        fields = fields.concat([{title: "公司名称", content: value, order: 1}]);
        break;
      case 'year':        
        fields = fields.concat([{title: "年份", content: value, order: 2}]);
        break;
      case 'companyCategory':               
        fields = fields.concat([{title: "业务种类", content: ProjectService.getCompanyCategory(project), order: 3}]);
        break;
      case 'aeoCategory':               
        fields = fields.concat([{title: "委托类型", content: ProjectService.getAeoCategory(project), order: 4}]);
        break;
      case 'creditRating':               
        fields = fields.concat([{title: "信用等级", content: ProjectService.getCreditRating(project), order: 5}]);
        break;
      default:
        break;
    }
  });
  return _.sortBy(fields, 'order');
}

@Form.create({})

class ProjectDetail extends Component {

  constructor(props) {
    super(props)
    this.props.getProjectDetail(props.routeParams.projectId);
  }

  render() {
    const Detail = () => {
      return (
          <Card title="项目详情" type="inner" extra={<a><Icon type="edit" onClick={this.props.edit} /></a>}>
            <List
              itemLayout="horizontal"
              dataSource={this.props.projectFields}
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

    return (
      <div className="detail-container">
        <Detail />
        <EditProjectPopover project={this.props.project}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  
  return {
    project: state.getProjectDetail.project,
    projectFields: _getProjectDetailFields(state.getProjectDetail.project),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getProjectDetail: (id) => {
      dispatch(projectDetail_get({id})).then((response) => {
        if (response.data.success) {
          dispatch(projectDetail_receive(response.data))
        }
      })
    },
    edit: () => {
      dispatch(editProjectForm_open());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);

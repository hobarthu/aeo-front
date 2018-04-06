import {
  routerReducer as routing,
} from 'react-router-redux'
import {
  combineReducers,
} from 'redux'

import { 
  getTemplateDetail, 
  editTemplateForm, 
  AddPopover,
} from './template'

import { 
  getProjectDetail, 
  editProjectForm, 
} from './project'

const rootReducer = combineReducers({
  routing,
  config: (state = {}) => state,
  getTemplateDetail,
  editTemplateForm,
  AddPopover,
  getProjectDetail, 
  editProjectForm,
});

export default rootReducer;

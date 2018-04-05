import {
  routerReducer as routing,
} from 'react-router-redux'
import {
  combineReducers,
} from 'redux'

import { 
  templatesList, 
  getTemplateDetail, 
  editTemplateForm, 
  AddPopover,
} from './template'

const rootReducer = combineReducers({
  routing,
  config: (state = {}) => state,
  templatesList,
  getTemplateDetail,
  editTemplateForm,
  AddPopover,

});

export default rootReducer;

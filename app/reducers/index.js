import {
  routerReducer as routing,
} from 'react-router-redux'
import {
  combineReducers,
} from 'redux'

import { templateResult, getTemplateDetail, editTemplateForm } from './template'

const rootReducer = combineReducers({
  routing,
  config: (state = {}) => state,

  templateResult,
  getTemplateDetail,
  editTemplateForm

});

export default rootReducer;

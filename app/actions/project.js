import { createAction } from 'redux-actions'

import {
    createAjaxAction,
    ajax,
} from 'utils'
  
export const project_create = createAjaxAction(ajax.fetchJSONByPost('/aeo/data/project/add'));
export const project_list = createAjaxAction(ajax.fetchJSONByPost('/aeo/data/project'));
export const project_detail = (reqData) => ajax.fetchJSONByGet('/aeo/data/project/' + reqData.id);


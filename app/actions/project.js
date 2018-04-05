import { createAction } from 'redux-actions'

import {
    createAjaxAction,
    ajax,
} from 'utils'
  
export const project_create = createAjaxAction(ajax.fetchJSONByPost('/aeo/data/project/add'));

export const templateDetail_get = (reqData) => ajax.fetchJSONByGet('/aeo/config/template/' + reqData.id);


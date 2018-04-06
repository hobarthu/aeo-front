import { createAction } from 'redux-actions'

import {
    createAjaxAction,
    ajax,
} from 'utils'
  
export const project_create = createAjaxAction(ajax.fetchJSONByPost('/aeo/data/project/add'));
export const project_list = createAjaxAction(ajax.fetchJSONByPost('/aeo/data/project'));
export const project_delete = (reqData) => ajax.fetchJSONByPost('/aeo/data/project/delete/' + reqData.id);


export const projectDetail_get = (reqData) => ajax.fetchJSONByGet('/aeo/data/project/' + reqData.id);
export const projectDetail_receive = createAction('RECEVIE_PROJECT_DETAIL')

export const editProjectForm_open = createAction('OPEN_EDIT_PROJECT_FORM')
export const editProjectForm_save = createAjaxAction(ajax.fetchJSONByPost('/aeo/data/project/update'), null, createAction('SAVE_EDIT_PROJECT_FORM'));
export const editProjectForm_cancel = createAction('CANCEL_EDIT_PROJECT_FORM')
import { createAction } from 'redux-actions'
import {
    template
} from 'api'

import {
    createAjaxAction,
    ajax,
} from 'utils'
  
export const getTemplatesList = createAjaxAction(template.getTemplates)

export const createTemplate = createAjaxAction(template.createTemplate);

export const editTemplateForm_open = createAction('OPEN_EDIT_TEMPLATE_FORM')
export const editTemplateForm_save = createAjaxAction(ajax.fetchJSONByPost('/aeo/config/template/update'), null, createAction('SAVE_EDIT_TEMPLATE_FORM'));
export const editTemplateForm_cancel = createAction('CANCEL_EDIT_TEMPLATE_FORM')

export const templateDetail_get = (reqData) => ajax.fetchJSONByGet('/aeo/config/template/' + reqData.id);
export const templateDetail_receive = createAction('RECEVIE_TEMPLATE_DETAIL')
export const templateDetail_saveFirstCategory = createAjaxAction(ajax.fetchJSONByPost('/aeo/config/category1/add'));
export const templateDetail_getFirstCategories = createAjaxAction(ajax.fetchJSONByPost('/aeo/config/category1'), null, createAction('TEMPLATEDETAIL_RECEIVE_FIRST_CATEGORIES'));

export const templates_delete = (reqData) => ajax.fetchJSONByPost('/aeo/config/template/delete/' + reqData.id);

export const AddPopover_open = createAction('ADDPOPOVER_OPEN')
export const AddPopover_save = createAction('ADDPOPOVER_SAVE')
export const AddPopover_cancel = createAction('ADDPOPOVER_CANCEL')


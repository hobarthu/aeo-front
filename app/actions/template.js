import { createAction } from 'redux-actions'
import {
    template
} from 'api'

import {
    createAjaxAction,
} from 'utils'
  

export const requestTemplatesList = createAction('request templates list')
export const recevieTemplatesList = createAction('receive templates list')
export const getTemplatesList = createAjaxAction(template.getTemplates, requestTemplatesList, recevieTemplatesList)

export const createTemplate = createAjaxAction(template.createTemplate);

export const recevieTemplateDetail = createAction('recevieTemplateDetail')
export const getTemplateDetail = createAjaxAction(template.getTemplateDetail, null, recevieTemplateDetail);

export const editTemplateForm_open = createAction('OPEN_EDIT_TEMPLATE_FORM')
export const editTemplateForm_save = createAction('SAVE_EDIT_TEMPLATE_FORM')
export const editTemplateForm_cancel = createAction('CANCEL_EDIT_TEMPLATE_FORM')

import { createAction } from 'redux-actions'
import {
    house,
    template
} from 'api'

import {
    createAjaxAction,
} from 'utils'
  

export const requestTemplatesList = createAction('request templates list')
export const recevieTemplatesList = createAction('receive templates list')
export const fetchTemplatesList = createAjaxAction(template.templates, requestTemplatesList, recevieTemplatesList)


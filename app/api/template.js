import { ajax } from 'utils'

export const getTemplates = ajax.fetchJSONByPost('/templates')
export const createTemplate = ajax.fetchJSONByPost('/create-template')
export const getTemplateDetail = ajax.fetchJSONByPost('/template_1001')

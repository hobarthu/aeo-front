import { ajax } from 'utils'

export const getTemplates = ajax.fetchJSONByPost('/aeo/config/template')
// export const getTemplates = ajax.fetchJSONByPost('/templates')
// export const createTemplate = ajax.fetchJSONByPost('/create-template')
export const createTemplate = ajax.fetchJSONByPost('/aeo/config/template/add')
// export const getTemplateDetail = ajax.fetchJSONByPost('/template_1001')
export const getTemplateDetail = ajax.fetchJSONByGet('/aeo/config/template/49')

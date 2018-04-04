import { ajax } from 'utils'

export const getTemplates = ajax.fetchJSONByPost('/aeo/config/template')
// export const getTemplates = ajax.fetchJSONByPost('/templates')
// export const createTemplate = ajax.fetchJSONByPost('/create-template')
export const createTemplate = ajax.postFormWithFile('/aeo/config/template/add')
export const update = ajax.postFormWithFile('/aeo/config/template/update')
// export const getTemplateDetail = ajax.fetchJSONByPost('/template_1001')
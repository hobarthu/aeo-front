import { ajax } from 'utils'

export const templates = ajax.fetchJSONByPost('/templates')

import { ajax } from 'utils'

export const login = ajax.fetchJSONByPost('/login')
export const register = ajax.fetchJSONByPost('/register')
export const userInfo = ajax.fetchJSONByPost('/userInfo')
export const templates = ajax.fetchJSONByPost('/templates')
const templates = require('./datas/templates')
const createTemplate = require('./datas/create-template')
const templateDetail = require('./datas/template_1001')

const prefix = '.json'

module.exports = {
  [`/templates${prefix}`]: templates,
  [`/create-template${prefix}`]: createTemplate,
  [`/template_1001${prefix}`]: templateDetail
}

const tableList = require('./datas/tableList')
const templates = require('./datas/templates')

const prefix = '.json'

module.exports = {
  [`/tableList${prefix}`]: tableList,
  [`/templates${prefix}`]: tableList
}

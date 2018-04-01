import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

export default routerMiddleware(hashHistory)

import {
  createAction,
} from 'redux-actions'
import {
  common,
} from 'api'
import {
  createAjaxAction,
  fakeAjaxAction,
} from 'utils'

export const templates = createAjaxAction(common.templates)


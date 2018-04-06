import { handleActions } from 'redux-actions'
import { ajax } from 'utils'

const getProjectDetail = handleActions({
  RECEVIE_PROJECT_DETAIL: (state, action) => {
    return {...state, project: action.payload.data}
  },
}, {})

const editProjectForm = handleActions({
  OPEN_EDIT_PROJECT_FORM: (state, action) => ({...state, visible: true }),
  SAVE_EDIT_PROJECT_FORM: (state, action) => ({ ...state, visible: false }),
  CANCEL_EDIT_PROJECT_FORM: (state, action) => ({ ...state, visible: false }),
}, {})

export {
  getProjectDetail, 
  editProjectForm,
}

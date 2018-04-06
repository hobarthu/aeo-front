import { handleActions } from 'redux-actions'
import { ajax } from 'utils'

const initialState = {
  list: []
}

const getTemplateDetail = handleActions({
  RECEVIE_TEMPLATE_DETAIL: (state, action) => {
    var template =  {
      id: action.payload.data.id,
      name: action.payload.data.name,
      code: action.payload.data.code,
      industry: action.payload.data.industry
    };
    return {...state, template}
  },
  TEMPLATEDETAIL_RECEIVE_FIRST_CATEGORIES: (state, action) => {
    return {...state, firstCategories: action.payload.res.data}
  },
}, {})

const editTemplateForm = handleActions({
  OPEN_EDIT_TEMPLATE_FORM: (state, action) => ({...state, visible: true }),
  SAVE_EDIT_TEMPLATE_FORM: (state, action) => ({ ...state, visible: false }),
  CANCEL_EDIT_TEMPLATE_FORM: (state, action) => ({ ...state, visible: false }),
}, {})

const AddPopover = handleActions({
  ADDPOPOVER_OPEN: (state, action) => ({...state, visible: true }),
  ADDPOPOVER_SAVE: (state, action) => ({...state, visible: false }),
  ADDPOPOVER_CANCEL: (state, action) => ({...state, visible: false }),
}, {})

export {
  AddPopover, 
  getTemplateDetail, 
  editTemplateForm 
}

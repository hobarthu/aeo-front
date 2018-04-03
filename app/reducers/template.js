import { handleActions } from 'redux-actions'
import { ajax } from 'utils'

const initialState = {
  list: []
}

const templateResult = handleActions({
  'receive templates list'(state, action) {
    console.log('aa', state, action);
    return { ...state, loading: false }
  }
}, initialState)

const getTemplateDetail = handleActions({
  RECEVIE_TEMPLATE_DETAIL: (state, action) => {
    var template =  {
      id: action.payload.data.id,
      name: action.payload.data.name,
      code: action.payload.data.code,
      industry: action.payload.data.industry
    };
    return {...state, template}
  }
}, {})

const editTemplateForm = handleActions({
  OPEN_EDIT_TEMPLATE_FORM: (state, action) => ({...state, visible: true }),
  SAVE_EDIT_TEMPLATE_FORM: (state, action) => ({ ...state, visible: false }),
  CANCEL_EDIT_TEMPLATE_FORM: (state, action) => ({ ...state, visible: false }),
}, {})

export { templateResult, getTemplateDetail, editTemplateForm }

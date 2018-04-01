import { handleActions } from 'redux-actions'

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
  'recevieTemplateDetail'(state, action) {
    console.log('ss', action);
    return {
      id: "1001",
      name: "模板1",
      code: "CHNCHN",
      industry: "建筑行业"
     }
  }
}, initialState)

const editTemplateForm = handleActions({
  OPEN_EDIT_TEMPLATE_FORM: (state, action) => ({...state, visible: true }),
  SAVE_EDIT_TEMPLATE_FORM: (state, action) => ({ ...state, visible: false }),
  CANCEL_EDIT_TEMPLATE_FORM: (state, action) => ({ ...state, visible: false }),
}, {})

export { templateResult, getTemplateDetail, editTemplateForm }

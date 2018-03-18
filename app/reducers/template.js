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

export { templateResult as default }

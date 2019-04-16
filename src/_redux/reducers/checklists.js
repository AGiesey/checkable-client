import {
  ADD_CHECKLIST,
  REMOVE_CHECKLIST,
  LOGOUT,
  IS_FETCHING
} from '../actionTypes';

const initialState = {
  isFetching: false,
  checklists: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CHECKLIST:
      return Object.assign({}, state, {
        checklists: {
          ...state.checklists,
          [action.checklist._id]: action.checklist
        }
      })
    case REMOVE_CHECKLIST:
      delete state.checklists[action.checklistId]
      return Object.assign({}, state, {
        checklists: {...state.checklists}
      })
    case IS_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
    case LOGOUT:
      return Object.assign({}, initialState)
    default: 
      return state;
  }
}
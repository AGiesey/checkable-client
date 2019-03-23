import {
  ADD_CHECKLIST,
  REMOVE_CHECKLIST,
  IS_FETCHING,
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
      return Object.assign({}, state, {
        checklists: {...state.checklists.filter(checklist => checklist._id !== action.checklistId)}
      })
    case IS_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
    default: 
      return state;
  }
}
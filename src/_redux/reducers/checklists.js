import {
  ADD_CHECKLIST,
  RENAME_CHECKLISTADD_CHECKLIST,
  SET_STATUS_CHECKLISTADD_CHECKLIST,
  DELETE_CHECKLISTADD_CHECKLIST,
  ADD_ITEM_CHECKLISTADD_CHECKLIST,
  RENAME_ITEM_CHECKLISTADD_CHECKLIST,
  SET_STATUS_ITEM_CHECKLISTADD_CHECKLIST,
  DELETE_ITEM_CHECKLISTADD_CHECKLIST,
} from '../actionTypes';

const initialState = {
  checklists: [{id: 1, name: 'hello world'}]
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CHECKLIST: {

    }
    default: 
      return state;
  }
}
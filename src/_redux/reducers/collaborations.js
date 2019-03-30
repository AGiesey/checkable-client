import {
  ADD_COLLABORATION,
  REMOVE_COLLABORATION,
  IS_FETCHING
} from '../actionTypes';

const initialState = {
  isFetching: false,
  collaborations: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COLLABORATION: 
      return Object.assign({}, state, {
        collaborations: {
          ...state.collaborations,
          [action.collaboration._id]: action.collaboration
        }
      })
    case REMOVE_COLLABORATION:
      delete state.collaborations[action.collaborationId]
      return Object.assign({}, state, {
        collaborations: {...state.collaborations}
      })
    case IS_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
    default:
      return state;
  }
}
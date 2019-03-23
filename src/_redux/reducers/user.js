import {
  ADD_CURRENT_USER,
  REMOVE_CURRENT_USER,
  IS_FETCHING
} from '../actionTypes';

const initialState = {
  isFetching: false,
  isLoggedIn: false,
  currentUser: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.currentUser,
        isLoggedIn: !!action.currentUser
      });
    case REMOVE_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: {},
        isLoggedIn: false
      })
    case IS_FETCHING:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
    default: 
      return state;
  }
}
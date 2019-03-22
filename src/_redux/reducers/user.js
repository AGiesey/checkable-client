import {
  ADD_CURRENT_USER
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
        currentUser: action.user,
        isLoggedIn: true
      });
    default: 
      return state;
  }
}
import {
  ADD_CURRENT_USER,
  REMOVE_CURRENT_USER,
  ADD_USER,
  REMOVE_USER,
  IS_FETCHING,
  LOGOUT
} from '../actionTypes';

const initialState = {
  isFetching: false,
  isLoggedIn: false,
  currentUser: {},
  users: {}
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
    case ADD_USER:
      return Object.assign({}, state, {
        users: {
          ...state.users,
          [action.user._id]: action.user
        }
      })
    case REMOVE_USER:
      delete state.users[action.userId];
      return Object.assign({}, state, {
        users: {...state.users}
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
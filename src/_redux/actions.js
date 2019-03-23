import {
  ADD_CHECKLIST,
  REMOVE_CHECKLIST,
  ADD_CURRENT_USER,
  REMOVE_CURRENT_USER,
  IS_FETCHING,
  LOGOUT
} from './actionTypes';
import { ChecklistsService } from '../_services/checklists.service';
import { UsersService } from '../_services/users.service';

export const _isFetching = isFetching => ({
  type: IS_FETCHING,
  isFetching: isFetching
})

export const _addChecklist = checklist => ({
  type: ADD_CHECKLIST,
  checklist: checklist
})

export const _removeChecklist = checklistId => ({
  type: REMOVE_CHECKLIST,
  checklistId: checklistId
})

export const _addCurrentUser = user => ({
  type: ADD_CURRENT_USER,
  currentUser: user
})

export const _removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
})

export const _logout = () => ({
  type: LOGOUT
})

export function addAllChecklistsForUserAsync(userId) {
  
  return function(dispatch) {
    dispatch(_isFetching(true));

    return ChecklistsService.findAllForUser(userId)
      .then(checklists => {
        checklists.map(checklist => dispatch(_addChecklist(checklist)));
        dispatch(_isFetching(false));
      })
  }
}

export function addChecklistByIdAsync(checklistId) {

  return function(dispatch) {
    dispatch(_isFetching(true));

    return ChecklistsService.findById(checklistId)
      .then(checklist => {
        dispatch(_addChecklist(checklist));
        dispatch(_isFetching(false));
      })
  }
}
import {
  ADD_CHECKLIST,
  DELETE_CHECKLIST,
  ADD_CURRENT_USER,
  REMOVE_CURRENT_USER,
} from './actionTypes';
import { ChecklistsService } from '../_services/checklists.service';
import { UsersService } from '../_services/users.service';

export const addChecklist = checklist => ({
  type: ADD_CHECKLIST,
  checklist: checklist
})

export const _removeChecklist = checklistId => ({
  type: DELETE_CHECKLIST,
  checklistId: checklistId
})

export const _addCurrentUser = user => ({
  type: ADD_CURRENT_USER,
  currentUser: user
})

export const _removeCurrentUser = () => {
  type: REMOVE_CURRENT_USER
}

export function getAllChecklistsForUser(userId) {
  
  return function(dispatch) {

    return ChecklistsService.findAllForUser(userId)
      .then(checklists => checklists.map(checklist => dispatch(addChecklist(checklist))))
  }
}

// export function addCurrentUser(user) {

//   return function(dispatch) {
//     return Users
//   }
// }
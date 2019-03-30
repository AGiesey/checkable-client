import {
  ADD_CHECKLIST,
  REMOVE_CHECKLIST,
  ADD_CURRENT_USER,
  REMOVE_CURRENT_USER,
  ADD_COLLABORATION,
  REMOVE_COLLABORATION,
  ADD_USER,
  REMOVE_USER,
  IS_FETCHING,
  LOGOUT
} from './actionTypes';
import { ChecklistsService } from '../_services/checklists.service';
import { UsersService } from '../_services/users.service';
import { CollaborationService } from '../_services/collaboration.service';

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

// UNUSED
export const _addCurrentUser = user => ({
  type: ADD_CURRENT_USER,
  currentUser: user
})

// UNUSED
export const _removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
})

export const _addUser = user => ({
  type: ADD_USER,
  user: user
})

export const _removeUser = userId => ({
  type: REMOVE_USER,
  userId: userId
})

export const _addCollaboration = collaboration => ({
  type: ADD_COLLABORATION,
  collaboration: collaboration
})

export const _removeCollaboration = collaborationId => ({
  type: REMOVE_COLLABORATION,
  collaborationId: collaborationId
})

// UNUSED
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

/**
 * Sequentially:
 *  - Set loading = true
 *  - get collaborations for given user and add to store
 *  - get collaborators for all fetched collaborations and add to store
 *  - Set loading = false
 * 
 * @param {number} userId 
 */
export function addAllCollaborationsForUserAsync(userId) {
  
  return function(dispatch) {
    dispatch(_isFetching(true));

    return CollaborationService.findAllForUser(userId)
      .then(collaborations => {
        const userPromises = [];
        collaborations.forEach(collaboration => {
          dispatch(_addCollaboration(collaboration));
          userPromises.push(UsersService.getUserById(collaboration.collaboratorId))
        })
        return userPromises;
      })
      .then(userPromises => {
        return Promise.all(userPromises);
      })
      .then(users => {
        users.forEach(user => {
          dispatch(_addUser(user));
        })
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

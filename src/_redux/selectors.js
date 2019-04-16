export const getAllChecklistsArray = store => Object.entries(store.checklists.checklists).map(entry => entry[1]);

export const getChecklistById = (store, checklistId) => store.checklists.checklists[checklistId];

export const getCurrentUser = store => store.users.currentUser;

export const getUserById = (store, userId) => store.users.users[userId];

export const isLoggedIn = store => store.users.isLoggedIn;

export const isFetching = (store, subState) => store[subState] ? store[subState].isFetching : false;

export const getAllCollaborationsArray = store => Object.entries(store.collaborations.collaborations).map(entry => entry[1]);

export const getAllVerifiedCollaborations = (store) => {
  const allCollaborations = Object.entries(store.collaborations.collaborations).map(entry => entry[1]);
  return allCollaborations.filter(collaboration => collaboration.status.id === 1);
}

export const getCollaborationByCollaboratorId = (store, collaboratorId) => {
  const allCollaborations = Object.entries(store.collaborations.collaborations).map(entry => entry[1]);
  const selectedCollaborations = allCollaborations.filter(collaboration => collaboration.collaboratorId === collaboratorId);
  return selectedCollaborations;
}

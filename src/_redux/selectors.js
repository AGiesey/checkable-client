export const getAllChecklistsArray = store => Object.entries(store.checklists.checklists).map(entry => entry[1]);

export const getChecklistById = (store, checklistId) => store.checklists.checklists[checklistId];

export const getCurrentUser = store => store.user.currentUser;

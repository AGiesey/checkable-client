import axios from 'axios';

const ChecklistsService = {

  findAllForUser: function(userId) {
    const encodedURI = window.encodeURI('http://localhost:3001/checklists/findAllForUser/' + userId)
    
    return axios.get(encodedURI)
      .then(res => {
        return res.data
      })
  },

  findById: function(checklistId) {
    const encodedURI = window.encodeURI('http://localhost:3001/checklists/findById/' + checklistId)
    
    return axios.get(encodedURI)
      .then(res => {
        return res.data
      })
  },

  updateChecklistName: function(checklistId, checklistName) {
    return axios.put(`http://localhost:3001/checklists/${checklistId}/updateChecklistName/${checklistName}`, null)
      .then(res => res.data);
  },

  updateChecklistStatus: function(checklistId, checklistStatus) {
    return axios.put(`http://localhost:3001/checklists/${checklistId}/updateChecklistStatus/${checklistStatus}`, null)
      .then(res => res.data);
  },

  createChecklistItem: function(checklistId, checklistItem) {
    return axios.post(`http://localhost:3001/checklistItems/createChecklistItem/${checklistId}`, checklistItem)
      .then(res => res.data);
  }

}

export { ChecklistsService };
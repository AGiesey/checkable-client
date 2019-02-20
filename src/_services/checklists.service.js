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
  }
}

export { ChecklistsService };
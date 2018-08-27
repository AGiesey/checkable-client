import axios from 'axios';

export const ChecklistsService = {

  findAllForUser: function(userId) {
    const encodedURI = window.encodeURI('http://localhost:3001/checklists/findAllForUser/' + userId)
    
    return axios.get(encodedURI)
      .then(res => {
        return res.data
      })
  }
}
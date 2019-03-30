import axios from 'axios';

const CollaborationService = {
  
  findAllForUser: function(userId) {
    return axios.get(`http://localhost:3001/collaborations/getCollaborationsByUserId/${userId}`)
      .then(response => {
        return response.data;
      })
  },

  findAllForCollaborator: function(CollaboratorId) {
    return axios.get(`http://localhost:3001/collaborations/getCollaborationsByCollaboratorId/${CollaboratorId}`)
      .then(response => {
        return response.data;
      })
  },
}

export { CollaborationService };
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

  inviteCollaborator: function(userId, collaboratorEmail) {
    return axios.post(`http://localhost:3001/collaborations/createCollaboration`, {
      userId: userId,
      collaboratorEmail: collaboratorEmail
    }).then(response => {
      return response.data
    })
  },

  setCollaborationStatus: function(collaborationId, status) {
    return axios.put(`http://localhost:3001/collaborations/${collaborationId}/updateStatus/${status}`, null)
      .then(response => {
        return response.data
      })
  },

  deleteCollaboration: function(collaborationId) {
    return axios.delete(`http://localhost:3001/collaborations/${collaborationId}/deleteCollaboration`)
  }
}

export { CollaborationService };
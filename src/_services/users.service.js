import axios from 'axios';

const UsersService = {

  getUserById: function(userId) {
    return axios.get(`http://localhost:3001/users/findById/${userId}`)
      .then(response => {
        return response.data;
      })
  },

  login: function(useremail, password) {
    const encodedURI = window.encodeURI(`http://localhost:3001/login/${useremail}/login`);

    return axios.post(encodedURI, { password: password })
      .then(response => {
        if (response && response.status === 200) {
          const user = response.data;
          user.authData = window.btoa(`${useremail}:${password}`);
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        }
      })
  },

  logout: function() {
    // TODO: logout on server too, after implementing tokenized auth.
    return new Promise((resolve, reject) => {
      resolve(localStorage.removeItem('user'))
    })
    
  },

  createUser: function(givenName, surName, email, password) {
    const encodedURI = window.encodeURI(`http://localhost:3001/users/createNewUser`);

    return axios.post(encodedURI, {
      givenName: givenName,
      surName: surName,
      password: password,
      email: email
    }).then(response => {
      if (response && response.status === 200) {
        const user = response.data;
        user.authData = window.btoa(`${email}:${password}`);
        localStorage.setItem('user', JSON.stringify(user))
      }
    })
  },

  updateUserName: function(userId, newUserName) {
    return axios.put(`http://localhost:3001/users/${userId}/updateUserName`, newUserName)
      .then(
        response => {
          const user = response.data;
          this.updateLocalStorageUser(user)
          return user
        }
      );
  },

  updateLocalStorageUser(user) {
    user.authData = JSON.parse(localStorage.getItem('user')).authData;
    localStorage.setItem('user', JSON.stringify(user))

  }
}

export { UsersService };
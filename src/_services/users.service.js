import axios from 'axios';

const UsersService = {
  login: function(useremail, password) {
    const encodedURI = window.encodeURI(`http://localhost:3001/login/${useremail}/login`);

    return axios.post(encodedURI, { password: password })
      .then(response => {
        if (response && response.status == 200) {
          const user = response.data;
          user.authData = window.btoa(`${useremail}:${password}`);
          localStorage.setItem('user', JSON.stringify(user))
        }
      })
  }
}

export { UsersService };
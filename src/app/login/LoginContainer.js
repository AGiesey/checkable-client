import React, { Component } from 'react';
import LoginComponent from './LoginComponent';

class LoginContainer extends Component {
  login(e) {
    e.preventDefault();
    console.log('login');
  }
  render() {
    return (
      <LoginComponent login={this.login}/>
    )
  }
}

export default LoginContainer;

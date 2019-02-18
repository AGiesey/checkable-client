import React from 'react';
import { Link } from 'react-router-dom';

import { LoginPage } from '../LoginPage/LoginPage';

class AppBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: undefined,
      loggedIn: false
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      user: user,
      loggedIn: !!user
    })
  }

  

  render() {
    const NavToolbar = () => {
      if (this.state.loggedIn) {
        return (
          <React.Fragment>
            <li><Link to={'/'}>Checklists</Link></li>
            <li><Link to={'profile'}>Profile</Link></li>
          </React.Fragment>
        );
      }
    }
    const NavUserInfo = () => (
      this.state.loggedIn
        ? <p className="navbar-text navbar-right">Welcome, {this.state.user.givenName}! </p>
        : ''
    )

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <span className="navbar-brand">Checkable</span>
          <ul className="nav navbar-nav">
            {NavToolbar()}
          </ul>
          {NavUserInfo()}
        </div>
      </nav>
    )
  }
}

export { AppBar };
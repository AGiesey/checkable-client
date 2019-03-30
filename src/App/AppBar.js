import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { _logout } from '../_redux/actions';

import { UsersService } from '../_services/users.service';

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ _logout }, dispatch)
  }
}

class AppBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: undefined,
      loggedIn: false,
      redirectToLogin: false,
    }

    this.logout = this.logout.bind(this);
  }

  logout() {
    UsersService.logout()
    .then(() => {
      this.props._logout();
      this.setState({
        redirectToLogin: true,
        user: undefined,
        loggedIn: false
      })
    });
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      user: user,
      loggedIn: !!user
    })
  }

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to='/login' />
    }

    const NavToolbar = () => {
      if (this.state.loggedIn) {
        return (
          <React.Fragment>
            <li><Link to={'/checklists'}>Checklists</Link></li>
            <li><Link to={'/profile'}>Profile</Link></li>
            <li><Link to={'/collaborators'}>Collaborators</Link></li>
          </React.Fragment>
        );
      }
    }
    const NavUserInfo = () => (
      this.state.loggedIn
        ? <p className="navbar-text navbar-right">Welcome, {this.state.user.givenName}! &nbsp;&nbsp;<span  className="btn btn-warning btn-xs" onClick={this.logout}>Logout</span></p>
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

AppBar = connect(null, mapDispatchToProps)(AppBar);
export { AppBar };
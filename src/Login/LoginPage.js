import React from 'react';
import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { _addCurrentUser, _addUser } from '../_redux/actions';

import { UsersService } from '../_services/users.service';
import { AppBar } from '../App/AppBar';

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ _addCurrentUser, _addUser }, dispatch)
  }
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false,
      loading: false,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;

    if (!username || !password) {
      return;
    }

    this.setState({ loading: true });
    UsersService.login(username, password)
      .then(
        user => {
          this.props._addCurrentUser(user);
          // Route the user to the checklists page upon login
          const { from } = { from: { pathname: "/checklists"} };
          this.props._addUser(user);
          this.props._addCurrentUser(user);
          this.props.history.push(from);
        },
        error => this.setState({ error, loading: false })
      )
  }

  render() {
    const { username, password, submitted, loading } = this.state;
    return (
      <React.Fragment>
        <AppBar />
        <div className="col-md-6 col-md-offset-3">
          <h2>Login</h2>
          <form name="form" onSubmit={this.handleSubmit}>
            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
              {submitted && !username &&
                <div className="help-block">Username is required</div>
              }
            </div>
            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
              {submitted && !password &&
                  <div className="help-block">Password is required</div>
              }
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" disabled={loading}>Login</button>
            </div>
          </form>
          <p>Don't have a Checkable account? Sign up <Link to={'/sign-up'}>Here.</Link></p>
        </div>
      </React.Fragment>
    )
  }
}

LoginPage = connect(null, mapDispatchToProps)(LoginPage)
export { LoginPage };
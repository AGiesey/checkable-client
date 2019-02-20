import React from 'react';

import { AppBar } from '../App/AppBar';
import { UsersService } from '../_services/users.service';

class SignUpPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      givenName: '',
      surName: '',
      username: '',
      password: '',
      confirmPassword: '',
      submitted: false,
      loading: false,
      error: ''
    }

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
    const { givenName, surName, username, password, confirmPassword } = this.state;

    if (!(username && password && confirmPassword)) {
      return;
    }

    this.setState({ loading: true });
    UsersService.createUser(givenName, surName, username, password)
      .then(
        user => {
          const { from } = { from: { pathname: "/"} };
          this.props.history.push(from);
        },
        error => this.setState({ error, loading: false })
      )
  }

  render() {
    const { surName, givenName, username, password, confirmPassword, submitted, loading } = this.state;
    return (
      <React.Fragment>
        <AppBar />
        <div className="col-md-6 col-md-offset-3">
          <h2>Sign Up</h2>
          <form name="form" onSubmit={this.handleSubmit}>
            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
              <label htmlFor="username">Username(email)</label>
              <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
              {submitted && !username &&
                <div className="help-block">Username is required</div>
              }
            </div>
            <div className='form-group'>
              <label htmlFor="givenName">First Name</label>
              <input type="text" className="form-control" name="givenName" value={givenName} onChange={this.handleChange} />
            </div>
            <div className='form-group'>
              <label htmlFor="surName">Last Name</label>
              <input type="text" className="form-control" name="surName" value={surName} onChange={this.handleChange} />
            </div>
            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
              {submitted && !password &&
                  <div className="help-block">Password is required</div>
              }
            </div>
            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} />
              {submitted && !confirmPassword &&
                  <div className="help-block">You must confirm your password</div>
              }
              {submitted && !(confirmPassword === password) &&
                  <div className="help-block">Passwords do not match</div>
              }
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" disabled={loading}>Sign Up</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export { SignUpPage }
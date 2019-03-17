import React from 'react';

import { AppBar } from '../App/AppBar';
import { UsersService } from '../_services/users.service';

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {
      user: undefined,
      givenName: '',
      surName: '',
      loading: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({loading: true})
    
    if (!this.state.surName || !this.state.givenName) {
      return;
    }

    //if (this.state.surName !== this.state.user.surName || this.state.givenName !== this.state.user.givenName) {
      UsersService.updateUserName(this.state.user._id, {surName: this.state.surName, givenName: this.state.givenName})
      .then(
        user => this.setState({
          user: user,
          givenName: user.givenName,
          surName: user.surName,
          loading: false
        })
      )
    //}
  }

  changePassword(e) {
    console.log('Change Password')
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.setState({ 
      user: user,
      givenName: user.givenName,
      surName: user.surName,
      loading: false
    })
  }

  render() {
    const { user, givenName, surName, loading } = this.state;

    if(loading) {
      return (
        <div className="col-md-6 col-md-offset-3">
          <h2>loading...</h2>
        </div>
      )
    }

    return (
      <React.Fragment>
        <AppBar />
        <div className="col-md-6 col-md-offset-3">
          <h2>{user.givenName + ' ' + user.surName + '\'s'} Profile</h2>
          <form name="editChecklistForm" onSubmit={this.handleSubmit}>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="givenName">First Name:</label>
                <input type="text" className="form-control" name="givenName" value={givenName} onChange={this.handleChange}></input>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="surName">Last Name:</label>
                <input type="text" className="form-control" name="surName" value={surName} onChange={this.handleChange}></input>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email">email <small className="chk-text-muted">(login)</small>:</label>
                <input type="text" className="form-control" name="email" value={user.email} disabled={true}></input>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email">Secondary Email:</label>
                <input type="text" className="form-control" name="email" value={user.email} disabled="true"></input>
              </div>
            </div> */}
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">Save</button>&nbsp;
              <button type="button" className="btn btn-info" onClick={this.changePassword}>Change Password</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export { UserProfilePage };
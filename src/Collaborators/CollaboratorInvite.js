import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { _addCollaboration, addAllUserCollaborationsAsync } from '../_redux/actions';

import { CollaborationService } from '../_services/collaboration.service';


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ _addCollaboration, addAllUserCollaborationsAsync }, dispatch)
  }
}

class CollaboratorInvite extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      collaboratorEmail: '',
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

    CollaborationService.inviteCollaborator(this.props.userId, this.state.collaboratorEmail)
      .then(() => {
        //TODO: Remove this when I upgrade the UI framework from Bootstrap 3.7
        const closeInviteDialog = document.getElementById('close-invite-collaborator');
        if (closeInviteDialog) {
          closeInviteDialog.click();
        }
        this.props.addAllUserCollaborationsAsync(this.props.userId);
      }, error => {
        console.error(error);
      })
  }

  render() {
    const { collaboratorEmail } = this.state;
    return (
      <form name="collaboratoInviteForm" onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="collaboratorEmail">Collaborator Email:</label>
              <input type="email" className="form-control" name="collaboratorEmail" value={collaboratorEmail} onChange={this.handleChange}></input>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <button type="submit" className="btn btn-primary">Invite</button>
        </div>
      </form>
    )
  }
}

CollaboratorInvite = connect(null, mapDispatchToProps)(CollaboratorInvite);
export { CollaboratorInvite };
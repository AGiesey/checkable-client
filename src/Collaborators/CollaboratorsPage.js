import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCurrentUser, getAllCollaborationsArray } from '../_redux/selectors';
import { _isFetching, addAllCollaborationsForUserAsync } from '../_redux/actions';

import { AppBar } from '../App/AppBar';
import { CollaborationStatuses } from '../_helpers/collaboration-status';

const CollaborationListItem = (props) => {
  const { collaboratorId, _id, status} = props.collaboration;
  return (
    <li className="list-group-item">
        <span className="glyphicon glyphicon-pencil chk-link" aria-hidden="true" data-toggle="collapse" data-target={`#edit-${_id}`}></span>
        &nbsp;&nbsp;<span>{collaboratorId}</span>
        <span className="chk-float-right">{status.name}</span>

        <div className="collapse" id={`edit-${_id}`} tabIndex="-1">
          <hr />
          <h4 className="modal-title" id="myModalLabel">Manage Collaboration</h4>
          
        </div>
      </li>
  )
}

const CollaboratorsList = (props) => {
  const { user, collaborations, isFetching} = props;
  if (isFetching) {
    return (
      <p>loading...</p>
    )
  }
  return (
    <React.Fragment>
      <h2>My Collaborations</h2>
      <div className="col-md-6 col-md-offset-3">
        <h2>
          {`${user.givenName} ${user.surName}'s collaborators:`}
        </h2>
        {collaborations.map(collaboration => <CollaborationListItem key={collaboration._id} collaboration={collaboration} />)}
      </div>
    </React.Fragment>
  );
}

const InviteCollaborator = (props) => {
  return (
    <h2>Invite Collaborator</h2>
  )
}

// own props is if the component needs data from its own props to get data from the store
function mapStateToProps(state, ownProps) {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    user: user,
    isFetching: _isFetching(state),
    collaborations: getAllCollaborationsArray(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getCurrentUser, addAllCollaborationsForUserAsync, _isFetching }, dispatch)
  }
}

class CollaboratorsPage extends React.Component {
  componentDidMount() {
    this.props.addAllCollaborationsForUserAsync(this.props.user._id)
  }

  render() {
    console.log('IN RENDER', this.props)
    const {user, collaborations} = this.props;
    return (
      <React.Fragment>
        <AppBar />
        <div className="col-md-6 col-md-offset-3">
         <CollaboratorsList user={user} collaborations={collaborations} />
        </div>
      </React.Fragment>
    )
  }
}

CollaboratorsPage = connect(mapStateToProps, mapDispatchToProps)(CollaboratorsPage)
export { CollaboratorsPage };
import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCurrentUser, getAllCollaborationsArray } from '../_redux/selectors';
import { _isFetching, _addUser, addAllCollaborationsForUserAsync } from '../_redux/actions';

import { AppBar } from '../App/AppBar';
import { CollaboratorsList } from './CollaboratorsList';

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
    ...bindActionCreators({ getCurrentUser, addAllCollaborationsForUserAsync, _addUser }, dispatch)
  }
}

class CollaboratorsPage extends React.Component {
  componentDidMount() {
    this.props.addAllCollaborationsForUserAsync(this.props.user._id)
    // Ensure current user is added to state in "Page" components. TODO: Do this better...
    this.props._addUser(this.props.user);
  }

  render() {
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
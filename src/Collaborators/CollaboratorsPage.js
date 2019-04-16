import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { isFetching, isLoggedIn, getCurrentUser, getAllCollaborationsArray } from '../_redux/selectors';
import { _addUser, _addCurrentUser, addAllUserCollaborationsAsync } from '../_redux/actions';

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
  console.log(isLoggedIn(state))
  return {
    user: user,
    isFetching: isFetching(state, 'collaborations'),
    isLoggedIn: isLoggedIn(state),
    collaborations: getAllCollaborationsArray(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getCurrentUser, addAllUserCollaborationsAsync, _addUser, _addCurrentUser }, dispatch)
  }
}

class CollaboratorsPage extends React.Component {
  componentDidMount() {
    this.props.addAllUserCollaborationsAsync(this.props.user._id)
    // Ensure current user is added to state in "Page" components. TODO: Do this better...
    this.props._addCurrentUser(this.props.user)
    this.props._addUser(this.props.user);
  }

  render() {
    const {user, isLoggedIn, isFetching, collaborations} = this.props;
    return (
      <React.Fragment>
        <AppBar />
        {isFetching || !isLoggedIn
          ? <p>Loading...</p>
          : (
              <div className="col-md-6 col-md-offset-3">
                <CollaboratorsList user={user} collaborations={collaborations} />
              </div>
            )
        }
      </React.Fragment>
    )
  }
}

CollaboratorsPage = connect(mapStateToProps, mapDispatchToProps)(CollaboratorsPage)
export { CollaboratorsPage };
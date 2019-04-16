import React from 'react';

import { CollaborationListItem } from './CollaborationListItem';
import { CollaboratorInvite } from './CollaboratorInvite';

class CollaboratorsList extends React.Component {
  
  render() {
    const { user, collaborations, isFetching} = this.props;
    if (isFetching) {
      return (
        <p>loading...</p>
      )
    }
    return (
      <React.Fragment>
        <div className="col-md-12d">
          <h2>
            {`${user.givenName} ${user.surName}'s collaborators:`}
            <button type="button" className="btn btn-default chk-float-right" data-toggle="modal" data-target="#collaboratorInvite">
              Invite Collaborator
            </button>
          </h2>
          {collaborations.map(collaboration => <CollaborationListItem key={collaboration._id} currentUser={user} collaboration={collaboration} />)}
        </div>
        <div className="modal fade" id="collaboratorInvite" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" id="close-invite-collaborator" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Invite Collaborator</h4>
              </div>
              <div className="modal-body">
                <CollaboratorInvite userId={user._id}/>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  
}

export { CollaboratorsList }
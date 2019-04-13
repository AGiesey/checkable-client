import React from 'react';

import { connect } from 'react-redux';
import { getUserById } from '../../_redux/selectors';

import { EditChecklistItem } from './EditChecklistItem';

function mapStateToProps(state, ownProps) {
  let assignedUser = ownProps.item.assignedToId 
    ? getUserById(state, ownProps.item.assignedToId)
    : getUserById(state, ownProps.checklistOwnerId)
  return {
    userAssigned: assignedUser
  }
}

class ChecklistItem extends React.Component {

  render() {
    const { name, status, _id, assignedToId } = this.props.item;
    const { checklistId, userAssigned, checklistOwnerId, checklistCollaborators } = this.props;

    return (
      <li className="list-group-item">
        <span className="glyphicon glyphicon-pencil chk-link" aria-hidden="true" data-toggle="collapse" data-target={`#edit-${_id}`}></span>
        &nbsp;&nbsp;<span><b>{name}</b></span>
        &nbsp;&nbsp;{userAssigned && userAssigned.givenName
          ? <span>Assigned To: {userAssigned.givenName + ' ' + userAssigned.surName}</span>
          : ''}
        <span className="chk-float-right">{status.name}</span>

        <div className="collapse" id={`edit-${_id}`} tabIndex="-1">
          <hr />
          <h4 className="modal-title" id="myModalLabel">Edit Checklist Item</h4>
          <EditChecklistItem name={name} statusId={status.id} itemId={_id} checklistOwnerId={checklistOwnerId} assignedToId={assignedToId} checklistCollaborators={checklistCollaborators} checklistId={checklistId} />
        </div>
      </li>
    )
  }
}

ChecklistItem = connect(mapStateToProps)(ChecklistItem);
export { ChecklistItem };
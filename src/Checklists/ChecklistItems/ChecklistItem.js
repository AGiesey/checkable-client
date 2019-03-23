import React from 'react';

import { EditChecklistItem } from './EditChecklistItem';

class ChecklistItem extends React.Component {

  render() {
    const { name, status, _id } = this.props.item
    const checklistId = this.props.checklistId
    return (
      <li className="list-group-item">
        <span className="glyphicon glyphicon-pencil chk-link" aria-hidden="true" data-toggle="collapse" data-target={`#edit-${_id}`}></span>
        &nbsp;&nbsp;<span>{name}</span>
        <span className="chk-float-right">{status.name}</span>

        <div className="collapse" id={`edit-${_id}`} tabIndex="-1">
          <hr />
          <h4 className="modal-title" id="myModalLabel">Edit Checklist Item</h4>
          <EditChecklistItem name={name} statusId={status.id} itemId={_id} checklistId={checklistId} />
        </div>
      </li>
    )
  }
}

export { ChecklistItem };
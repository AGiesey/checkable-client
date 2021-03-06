import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addChecklistByIdAsync } from '../../_redux/actions';

import { ChecklistItemStatuses } from '../../_helpers/checklist-item-statuses';
import { ChecklistsService } from '../../_services/checklists.service';

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ addChecklistByIdAsync }, dispatch)
  }
}

class EditChecklistItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      statusId: this.props.statusId,
      assignedToId: this.props.assignedToId || this.props.checklistOwnerId
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const requests = []
    // If the ui updated the value, its probably a string.
    const statusIdInt = Number.parseInt(this.state.statusId, 10);

    if(this.props.name !== this.state.name) {
      requests.push(ChecklistsService.updateChecklistItemName(this.props.checklistId, this.props.itemId, this.state.name))
    }

    if(this.props.statusId !== statusIdInt) {
      const newStatusObject = ChecklistItemStatuses.find(status => status.id === statusIdInt);
      if (newStatusObject) {
        requests.push(ChecklistsService.updateChecklistItemStatus(this.props.checklistId, this.props.itemId, newStatusObject.value));
      }
    }

    if(this.props.assignedToId !== this.state.assignedToId) {
      requests.push(ChecklistsService.updateChecklistItemAssignedToId(this.props.checklistId, this.props.itemId, this.state.assignedToId));
    }

    if (requests.length > 0 ) {
      Promise.all(requests)
        .then(
          () => {
            this.props.addChecklistByIdAsync(this.props.checklistId);
          }
        )
        .catch(err => console.error(err))
    }
  }

  deleteItem(e) {
    e.preventDefault();

    ChecklistsService.deleteChecklistItem(this.props.checklistId, this.props.itemId)
      .then(
        () => {
          this.props.addChecklistByIdAsync(this.props.checklistId)
        }
      )
  }

  render() {
    const {checklistCollaborators, checklistOwnerId} = this.props;
    const { name, statusId, assignedToId } = this.state;

    return (
      <div>
        <form name="editChecklistItemForm" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="name">Item Name:</label>
                <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange}></input>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select className="form-control" name="statusId" value={statusId} onChange={this.handleChange}>
                  {ChecklistItemStatuses.map(status => <option key={status.id} value={status.id}>{status.name}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="assignedToId">Assign To:</label>
              <select className="form-control" name="assignedToId" value={assignedToId} onChange={this.handleChange}>
                <option value={checklistOwnerId}>Checklist Owner</option>
                {Array.isArray(checklistCollaborators) && checklistCollaborators.length > 0
                  ? checklistCollaborators.map(user => (
                    user && user._id 
                      ? <option key={user._id} value={user._id}>{user.givenName + ' ' + user.surName}</option>
                      : ''))
                  : '' }
              </select>
            </div>
          </div>
          </div>
          <hr />
          <div>
            <button type="button" className="btn btn-warning" onClick={this.deleteItem}>Delete Item</button>&nbsp;
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    )
  }
}

EditChecklistItem = connect(null, mapDispatchToProps)(EditChecklistItem);
export { EditChecklistItem };
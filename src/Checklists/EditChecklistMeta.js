import React from 'react';

import { ChecklistStatuses } from '../_helpers/checklist-statuses'
import { ChecklistsService } from '../_services/checklists.service';

class EditChecklistMeta extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      statusId: this.props.statusId
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteChecklist = this.deleteChecklist.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const requests = []
    // If the ui updated the value, its probably a string.
    const statusIdInt = Number.parseInt(this.state.statusId);

    if(!(this.props.name === this.state.name)) {
      requests.push(ChecklistsService.updateChecklistName(this.props.checklistId, this.state.name))
    }

    if(!(this.props.statusId === statusIdInt)) {
      const newStatusObject = ChecklistStatuses.find(status => status.id === statusIdInt);
      if (newStatusObject) {
        requests.push(ChecklistsService.updateChecklistStatus(this.props.checklistId, newStatusObject.value));
      }
    }

    if (requests.length > 0 ) {
      Promise.all(requests)
        .then(
          () => alert('Checklist Saved')
        )
        .catch(err => console.error(err))
    }
  }

  deleteChecklist(e) {
    e.preventDefault();

    ChecklistsService.deleteChecklist(this.props.checklistId)
      .then(
        () => alert('Checklist Deleted')
      )
  }

  render() {
    const {statusId, name} = this.state;
    return (
      <div>
        <form name="editChecklistForm" onSubmit={this.handleSubmit}>
          <div className="col-med-6">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange}></input>
            </div>
          </div>
          <div className="col-med-6">
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select className="form-control" name="statusId" value={statusId} onChange={this.handleChange}>
                {ChecklistStatuses.map(status => <option key={status.id} value={status.id}>{status.name}</option>)}
              </select>
            </div>
          </div>
          <hr />
          <div>
            <button type="button" className="btn btn-warning" onClick={this.deleteChecklist}>Delete Checklist</button>&nbsp;
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
      
    )
  }
}

export { EditChecklistMeta };
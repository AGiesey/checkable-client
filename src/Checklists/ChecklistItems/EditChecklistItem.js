import React from 'react';

import { ChecklistItemStatuses } from '../../_helpers/checklist-item-statuses';
import { ChecklistsService } from '../../_services/checklists.service';

class EditChecklistItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      statusId: this.props.statusId
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

  }

  render() {
    const { name, statusId } = this.state;

    return (
      
      <div>
        <form name="editChecklistItemForm" onSubmit={this.handleSubmit}>
          <div className="col-med-6">
            <div className="form-group">
              <label htmlFor="name">Item Name:</label>
              <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange}></input>
            </div>
          </div>
          <div className="col-med-6">
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select className="form-control" name="statusId" value={statusId} onChange={this.handleChange}>
                {ChecklistItemStatuses.map(status => <option key={status.id} value={status.id}>{status.name}</option>)}
              </select>
            </div>
          </div>
          <hr />
          <div>
            <button type="button" className="btn btn-warning">Delete Item</button>&nbsp;
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    )
  }
  
}
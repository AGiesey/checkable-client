import React from 'react';
import { ChecklistsService } from '../../_services/checklists.service';
import { ChecklistItemStatuses } from '../../_helpers/checklist-item-statuses';

class CreateChecklistItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
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

    ChecklistsService.createChecklistItem(this.props.checklistId, {
      name: this.state.name, 
      status: ChecklistItemStatuses.find(status => status.value === 'NOT_STARTED').value
    })
    .then(checklist => console.log(checklist));
  }

  render() {
    const {name} = this.state;
    return (
      <div>
        <form name="addChecklistItemForm" onSubmit={this.handleSubmit}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange}></input>
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    )
  }
}

export { CreateChecklistItem };
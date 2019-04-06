import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addChecklistByIdAsync } from '../../_redux/actions';

import { ChecklistsService } from '../../_services/checklists.service';
import { ChecklistItemStatuses } from '../../_helpers/checklist-item-statuses';

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ addChecklistByIdAsync }, dispatch)
  }
}

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
    .then(() => {
      //TODO: Remove this when I upgrade the UI framework from Bootstrap 3.7
      const closeCreateDialog = document.getElementById('close-create-checklist');
      if (closeCreateDialog) {
        closeCreateDialog.click();
      }
      this.props.addChecklistByIdAsync(this.props.checklistId)
    });
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

CreateChecklistItem = connect(null, mapDispatchToProps)(CreateChecklistItem);
export { CreateChecklistItem };
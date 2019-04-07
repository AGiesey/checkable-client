import React from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAllVerifiedCollaborations, getUserById } from '../_redux/selectors';
import { _removeChecklist, addChecklistByIdAsync } from '../_redux/actions';

import { ChecklistStatuses } from '../_helpers/checklist-statuses'
import { ChecklistsService } from '../_services/checklists.service';
import { cpus } from 'os';

function mapStateToProps(state) {
  return {
    allCollaborators: getAllVerifiedCollaborations(state).map(collaboration => getUserById(state, collaboration.collaboratorId))
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ _removeChecklist, addChecklistByIdAsync }, dispatch)
  }
}

class EditChecklist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      statusId: this.props.statusId,
      selectedCollaboratorIds: [...this.props.selectedCollaboratorIds],
      checklistDeleted: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteChecklist = this.deleteChecklist.bind(this);
    this.getCollaboratorOptions = this.getCollaboratorOptions.bind(this);
    this.handleCollabChange = this.handleCollabChange.bind(this);
  }

  getCollaboratorOptions() {
    if (!this.props.allCollaborators || (Array.isArray(this.props.allCollaborators) && this.props.allCollaborators.length < 1)) {
      return <p>Invite collaborators from the collaborators page.</p>
    }
    return this.props.allCollaborators.map(collaborator => {
      if (collaborator && collaborator.givenName && collaborator._id && collaborator.surName) {
        return (
          <div className="checkbox" key={collaborator._id}><label><input type="checkbox" value={collaborator._id} onChange={this.handleCollabChange} checked={this.state.selectedCollaboratorIds.some(preSelectedId => collaborator._id === preSelectedId)} />{collaborator.givenName + ' ' + collaborator.surName}</label></div>
        )
      }
    })
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleCollabChange(e) {
    const checked = e.target.checked;
    const value = e.target.value;
    let newCollaboratorIds = this.state.selectedCollaboratorIds

    if (checked) {
      newCollaboratorIds.push(value);
    } else {
      newCollaboratorIds = newCollaboratorIds.filter(collaboratorId => collaboratorId !== value);
    }

    this.setState({selectedCollaboratorIds: newCollaboratorIds});
  }

  handleSubmit(e) {
    e.preventDefault();
    const requests = []
    // If the ui updated the value, its probably a string.
    const statusIdInt = Number.parseInt(this.state.statusId, 10);

    const collaboratorsToDelete = this.props.selectedCollaboratorIds.filter(collaboratorId => !this.state.selectedCollaboratorIds.some(selectedId => selectedId === collaboratorId));
    const collaboratorsToAdd = this.state.selectedCollaboratorIds.filter(selectedId => !this.props.selectedCollaboratorIds.some(existingSelectedId => existingSelectedId === selectedId));

    if (collaboratorsToDelete.length > 0) {
      requests.push(...collaboratorsToDelete.map(collaboratorId => ChecklistsService.removeChecklistCollaborator(this.props.checklistId, collaboratorId)));
    }

    if (collaboratorsToAdd.length > 0) {
      requests.push(...collaboratorsToAdd.map(collaboratorId => ChecklistsService.addChecklistCollaborator(this.props.checklistId, collaboratorId)));
    }
    
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
          () => {
            this.props.addChecklistByIdAsync(this.props.checklistId)
          }
        )
        .catch(err => console.error(err))
    }
  }

  deleteChecklist(e) {
    e.preventDefault();

    ChecklistsService.deleteChecklist(this.props.checklistId)
      .then(
        () => {
          this.props._removeChecklist(this.props.checklistId)
          this.setState({
            checklistDeleted: true
          })
        }
      )
  }

  render() {
    const {statusId, name, checklistDeleted} = this.state;

    if (checklistDeleted) {
      return <Redirect to="/checklists" />
    }

    return (
      
      <div>
        <form name="editChecklistForm" onSubmit={this.handleSubmit}>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange}></input>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select className="form-control" name="statusId" value={statusId} onChange={this.handleChange}>
                {ChecklistStatuses.map(status => <option key={status.id} value={status.id}>{status.name}</option>)}
              </select>
            </div>
          </div>
          <div className="col-md-12">
            <label>Associate Collaborators</label>
            {this.getCollaboratorOptions()}
            &nbsp;
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

EditChecklist = connect(mapStateToProps, mapDispatchToProps)(EditChecklist);
export { EditChecklist };
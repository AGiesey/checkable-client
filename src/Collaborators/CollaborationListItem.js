import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getUserById } from '../_redux/selectors';
import { _addCollaboration } from '../_redux/actions';

import { CollaborationStatuses } from '../_helpers/collaboration-statuses';
import { CollaborationService } from '../_services/collaboration.service';

function mapStateToProps(state, ownProps) {
  return {
    user: getUserById(state, ownProps.collaboration.userId),
    collaborator: getUserById(state, ownProps.collaboration.collaboratorId)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ _addCollaboration }, dispatch)
  }
}

class CollaborationListItem extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      statusId: this.props.collaboration.status.id
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
    
    // If the ui updated the value, its probably a string.
    const statusIdInt = Number.parseInt(this.state.statusId, 10);
    const newStatusObject = CollaborationStatuses.find(status => status.id === statusIdInt);
    
    CollaborationService.setCollaborationStatus(this.props.collaboration._id, newStatusObject.value)
      .then(collaboration => {
        this.props._addCollaboration(collaboration);
      }, error => {
        console.error(error);
      })
  }

  render() {
    const { collaboratorId, _id, status} = this.props.collaboration;
    const { user, collaborator } = this.props;
    const { statusId } = this.state;

    if (!collaborator) {
      return <p>loading...</p>
    }
    return (
      <li className="list-group-item">
        <span className="glyphicon glyphicon-pencil chk-link" aria-hidden="true" data-toggle="collapse" data-target={`#edit-${_id}`}></span>
        &nbsp;&nbsp;<span>{collaborator.givenName + ' ' + collaborator.surName}</span>
        <span className="chk-float-right">{status.name}</span>

        <div className="collapse" id={`edit-${_id}`} tabIndex="-1">
          <hr />
          <h4 className="modal-title" id="myModalLabel">Set Collaboration Status</h4>
          <form name="collaborationStatusForm" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="collaboratorEmail">Collaboration Status:</label>
                  <select className="form-control" name="statusId" value={statusId} onChange={this.handleChange}>
                    {CollaborationStatuses.map(status => <option key={status.id} value={status.id}>{status.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </li>
    )
  }
  
}

CollaborationListItem = connect(mapStateToProps, mapDispatchToProps)(CollaborationListItem)
export { CollaborationListItem };
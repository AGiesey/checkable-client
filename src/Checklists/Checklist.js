import React from 'react';

import { connect } from 'react-redux';
import { getChecklistById } from '../_redux/selectors'

import { CreateChecklistItem } from './ChecklistItems/CreateChecklistItem';
import { EditChecklist } from './EditChecklist';
import { ChecklistItem } from './ChecklistItems/ChecklistItem';

function mapStateToProps(state, ownProps) {
  const checklist = getChecklistById(state, ownProps.match.params.checklistId)
  return { checklist };
}

class Checklist extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      checklist: this.props.checklist
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentWillUnmount() {
    // TODO: This is an embarrising hack because I've stooped to using bootstrap 3, replace all.
    const closeButton = document.getElementById('close-edit-checklist')

    if(closeButton) {
      closeButton.click();
    }
  }

  render() {
    const { checklist } = this.state;
    if (!checklist) {
      return (
        <div className="col-md-6 col-md-offset-3">
          loading...
        </div>
      )
    }

    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>{checklist.name}
          <button type="button" className="btn btn-default chk-float-right" data-toggle="modal" data-target="#editChecklist">
            Edit
          </button>
        </h2>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="checklist-name">Status:</label>
            <p>{checklist.status.name}</p>
          </div>
          <div className="col-md-3">
            <label htmlFor="checklist-name">Created On:</label>
            <p>{new Date(checklist.createdAt).toDateString()}</p>
          </div>
          <div className="col-md-3">
            <label htmlFor="checklist-name">Last Updated:</label>
            <p>{new Date(checklist.updatedAt).toDateString()}</p>
          </div>
        </div>
        <hr />
        <h3>Items:
          <button type="button" className="btn btn-default chk-float-right" data-toggle="modal" data-target="#addItem">
            Add
          </button>
        </h3>
        <div className="col-md-11 chk-pull-to-left-edge">
        <br />
          {checklist.items.map(item => <ChecklistItem key={item._id} item={item} checklistId={checklist._id}/>)}
        </div>
        <div className="modal fade" id="addItem" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" id="close-create-checklist" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Add Checklist Item</h4>
              </div>
              <div className="modal-body">
                <CreateChecklistItem checklistId={checklist._id}/>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="editChecklist" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" id="close-edit-checklist" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Edit Checklist</h4>
              </div>
              <div className="modal-body">
                <EditChecklist checklistId={checklist._id} name={checklist.name} statusId={checklist.status.id}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}

Checklist = connect(mapStateToProps)(Checklist)
export { Checklist };
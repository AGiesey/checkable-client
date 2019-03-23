import React from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { _addChecklist } from '../_redux/actions';

import { ChecklistsService } from '../_services/checklists.service';
import '../_styles/create-checklist.css';

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ _addChecklist }, dispatch)
  }
}

class CreateChecklist extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      newItemName: '',
      items: [],
      id: undefined
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.addChecklistItem = this.addChecklistItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  addChecklistItem() {
    const checklistItem = {
      name: this.state.newItemName,
      tempId: this.state.items.length
    }
    this.setState({
      items: [
        ...this.state.items,
        checklistItem
      ],
      newItemName: ''
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.name) {
      return;
    }

    const checklist = {
      name: this.state.name,
      ownerId: this.props.userId,
      items: this.state.items
    }

    ChecklistsService.createChecklist(checklist)
      .then(checklist => {
        this.props._addChecklist(checklist);
        this.setState({id: checklist._id})
      })
  }

  render() {
    const { items, name, newItemName, id } = this.state;

    // Checklist has been created, go to it instead of staying on the create page.
    if (id) {
      return <Redirect to={`/checklists/checklist/${id}`} />
    } 

    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Create New Checklist</h2>
        <form name="CreateChecklistForm" onSubmit={this.handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="name">Checklist Name:</label>
            <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange}></input>
          </div>

          <div className="form-group">
            <label htmlFor="name">Add New Item:</label>
            <input type="text" className="form-control" name="newItemName" value={newItemName} onChange={this.handleChange}></input>
            
          </div>
          <div>
            <button type="button" className="btn btn-info" onClick={this.addChecklistItem}>Add</button>
          </div>
          <hr />
          <h3>Items:</h3>
          <div className="chk-checklist-items-container">
            <ul className="list-group">
              {
                items.map(item => <li className="list-group-item" key={item.tempId}>{item.name}</li>)
              }
            </ul>
          </div>
          
          
          <div>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    )
  }
}

CreateChecklist = connect(null, mapDispatchToProps)(CreateChecklist)
export { CreateChecklist };
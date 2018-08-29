import React, { Component } from 'react';
import './edit-checklist.css'

export default class EditChecklist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      readOnly: true,
    }

    this.addNewChecklistItem = this.addNewChecklistItem.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  toggleItem(item) {
    item.checked = !item.checked;
    console.log(item.id, item.checked);
  }
  
  renderChecklistItem(item) {
    return (
      <li key={item._id} className="list-group-item">
        <span className="item-checked-input-container"><input type="checkbox" onClick={() => this.toggleItem(item)} /></span> 
        <span>{item.name}</span> 
      </li>
    )
  }

  addNewChecklistItem(event) {
    event.preventDefault();
    let itemName = event.target.name.value;
    this.props.onAddItem({name: itemName, status: 0}, this.props.checklist.id);
    this.setState({addNew: false})
  }

  render() {
    let checklistItems = this.props.checklist.items.map(item => this.renderChecklistItem(item));
    let newChecklistItemForm;

    if (this.state.addNew) {
      newChecklistItemForm = 
      <div className="jumbotron">
        <form onSubmit={this.addNewChecklistItem}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" className="form-control" />
          </div>
          <button type="submit" className="btn btn-outline-success btn-sm">Save</button>
        </form>
      </div>
    }

    return (
      <div className="col">
        <h5>{this.props.checklist.name} Checklist</h5>
        {newChecklistItemForm}
        <form onSubmit={this.editChecklist}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" value={this.props.checklist.name} onChange={this.handleNameChange}/>
          </div>
          
          <ul className="list-group">
            <li className="list-group-item">
              <span>Items <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => this.setState({addNew: true})}>Add</button></span>
            </li>
            {checklistItems}
          </ul>  
        </form>
      </div>
    )
  }
}
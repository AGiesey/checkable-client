import React, { Component } from 'react';
import './checklist-grid.css';

export default class ChecklistGrid extends Component {

  render() {
    let checklists = this.props.checklists.map(checklist => {
      return ( 
        <li key={checklist.id.toString()} className="list-group-item clickable" onClick={() => this.props.onSelectChecklist(checklist)}>
          <span className="checklist-prop-title">ID: </span> {checklist.id}  
          <span className="checklist-prop-title">Name: </span> {checklist.name}
          <span className="checklist-prop-title">Number of Items: </span> {checklist.items.length}
        </li>
      )
    });
    return (
      <div className="col">
        <h3>My Checklists <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.props.onCreateNewChecklist}>Add</button></h3>
        <ul className="list-group">
          {checklists}
        </ul>
      </div>
    )
  }
}

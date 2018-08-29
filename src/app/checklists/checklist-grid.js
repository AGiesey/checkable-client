import React from 'react';
import PropTypes from 'prop-types';
import './checklist-grid.css';

// TODO: Make all stateless components look like this one. (stateless functional components)
export default function ChecklistGrid(props) {
  let checklists = props.checklists.map(checklist => {
    return ( 
      <li key={checklist._id} className="list-group-item clickable" onClick={() => props.onSelectChecklist(checklist)}>
        <span className="checklist-prop-title">ID: </span> {checklist._id}  
        <span className="checklist-prop-title">Name: </span> {checklist.name}
        <span className="checklist-prop-title">Number of Items: </span> {checklist.items.length}
      </li>
    )
  });

  return (
    <div className="col">
      <h3>My Checklists <button type="button" className="btn btn-outline-primary btn-sm" onClick={props.onCreateNewChecklist}>Add</button></h3>
      <ul className="list-group">
        {checklists}
      </ul>
    </div>
  )
}

ChecklistGrid.propTypes = {
  onSelectChecklist: PropTypes.func.isRequired,
  onCreateNewChecklist: PropTypes.func.isRequired,
  checklists: PropTypes.array.isRequired
}

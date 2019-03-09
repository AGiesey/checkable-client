import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ChecklistListItem  = ({ checklist }) => (
  <li className="list-group-item"><Link to={`/checklists/checklist/${checklist._id}`}>{checklist.name}</Link></li>
)

ChecklistListItem.propTypes = {
  checklist: PropTypes.object.isRequired
}

export {ChecklistListItem};
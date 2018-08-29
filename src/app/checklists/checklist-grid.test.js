import React from 'react';
import ReactDOM from 'react-dom';
import ChecklistGrid from './checklist-grid';

const allChecklists = [
  {id: 1, name: 'first', ownerId: 5, items: []},
]

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChecklistGrid checklists={allChecklists} />, div);
  ReactDOM.unmountComponentAtNode(div);
})
import React from 'react';
import ReactDOM from 'react-dom';
import ChecklistPage from './checklist-page';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChecklistPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// TODO for when I ACTUALLY figure out unit testing...
TestChecklists = [
  {_id: '1', name: 'first', ownerId: 5, items: [
    {_id: '1', checklistId: 1, name: 'Do Some Stuff', status: 1},
    {_id: '2', checklistId: 1, name: 'Do Some More Stuff', status: 0},
    {_id: '3', checklistId: 1, name: 'Redo The Stuff', status: 0}
  ]},
  {_id: '2', name: 'second', ownerId: 5, items: []},
  {_id: '3', name: 'third', ownerId: 5, items: []},
  {_id: '4', name: 'fourth', ownerId: 5, items: []},
  {_id: '5', name: 'fifth', ownerId: 5, items: []}
]
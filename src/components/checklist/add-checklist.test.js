import React from 'react';
import ReactDOM from 'react-dom';
import AddChecklist from './add-checklist';

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddChecklist />, div);
  ReactDOM.unmountComponentAtNode(div);
});
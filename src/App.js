import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ChecklistPage from './app/checklists/checklist-page';
import LoginContainer from './app/login/LoginContainer';
import './App.css';

const App = () => (
  <div className="App">
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">Checkable</a>
      <button className="btn btn-primary">Start</button>
    </nav>
    <Router>
      <Switch>
        <Route exact path="/" component={LoginContainer}/>
        <Route path="checklist" component={ChecklistPage}/>
      </Switch>
    </Router>
  </div>
)

export default App;

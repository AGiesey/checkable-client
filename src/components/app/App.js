import React, { Component } from 'react';
// import Login from '../login/login';
// import AddChecklist from '../checklist/add-checklist';
import ChecklistPage from '../checklist/checklist-page';
import logo from '../../assets/logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Checkable</h1>
        </header>
        <main>
          <ChecklistPage />
        </main>
      </div>
      
    );
  }
}

export default App;

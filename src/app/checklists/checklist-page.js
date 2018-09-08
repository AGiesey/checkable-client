import React, { Component } from 'react';
import { ChecklistsService } from '../../utils/checklists-service';
import { BrowserRouter as router } from 'react-router-dom';
import ChecklistGrid from './checklist-grid';
import AddChecklist from './add-checklist';
import EditChecklist from './edit-checklist';

export default class ChecklistPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedChecklist: undefined,
      newChecklist: undefined,
      allChecklists: undefined,
    }

    this.createNewChecklist = this.createNewChecklist.bind(this);
    this.selectChecklist = this.selectChecklist.bind(this);
    this.saveChecklist = this.saveChecklist.bind(this);
    this.addItemToChecklist = this.addItemToChecklist.bind(this);
  }

  componentDidMount() {
    // TODO: Read best implementation. In angular it would be an injected service, but that doesn't look like what we want to do in react.
    ChecklistsService.findAllForUser('5b7e24420acc82270ce5d04d')
      .then(checklists => {
        this.setState({allChecklists: checklists})
      })
  }

  createNewChecklist() {
    if (this.state.selectedChecklist) {
      this.setState({selectChecklist: undefined})
    }
    this.setState({newChecklist: {}})
  }

  addItemToChecklist(item, checklistId) {
    let checklist = this.allChecklists.find(checklist => checklist.id === checklistId);
    item.id = Math.max(...checklist.items.map(item => item.id)) + 1;
    checklist.items.push(item);
    this.setState({allChecklists: this.allChecklists})
  }

  selectChecklist(checklist) {
    if (this.state.newChecklist) {
      this.setState({newChecklist: undefined})
    }
    this.setState({selectedChecklist: checklist})
  }

  saveChecklist(checklist) {

    // TODO: implement this with the api

    if (checklist.id) {
      let existingChecklist = this.allChecklists.find(existingChecklist => existingChecklist.id === checklist.id);
      existingChecklist.name = checklist.name;
    }
    else {
      checklist._id = 'ljsdfjw' + this.allChecklists.length + 1;
      checklist.ownerId = 5;
      checklist.items = [];
      this.allChecklists.push(checklist);
      this.setState({allChecklists: this.allChecklists});
    }
  }


  renderRight() {
    if (this.state.newChecklist) {
      return <AddChecklist checklist={this.state.newChecklist} onSaveChecklist={this.saveChecklist} />
    }
    else if (this.state.selectedChecklist) {
      return <EditChecklist checklist={this.state.selectedChecklist} onSaveChecklist={this.saveChecklist} onAddItem={this.addItemToChecklist} />
    }
  }

  render() {
    return (
      <main>

          {!this.state.allChecklists 
            ? <p>LOADING</p>
            : <ChecklistGrid checklists={this.state.allChecklists} onCreateNewChecklist={this.createNewChecklist} onSelectChecklist={this.selectChecklist} />
          }
          {this.renderRight()}
      </main>
    )
  }
}
import React, { Component } from 'react';
import ChecklistGrid from './checklist-grid';
import AddChecklist from './add-checklist';
import EditChecklist from './edit-checklist';

export default class ChecklistPage extends Component {
  allChecklists = [
    {id: 1, name: 'first', ownerId: 5, items: [
      {id: 1, checklistId: 1, name: 'Do Some Stuff', status: 1},
      {id: 2, checklistId: 1, name: 'Do Some More Stuff', status: 0},
      {id: 3, checklistId: 1, name: 'Redo The Stuff', status: 0}
    ]},
    {id: 2, name: 'second', ownerId: 5, items: []},
    {id: 3, name: 'third', ownerId: 5, items: []},
    {id: 4, name: 'fourth', ownerId: 5, items: []},
    {id: 5, name: 'fifth', ownerId: 5, items: []}
  ]

  constructor(props) {
    super(props);
    this.state = {
      selectedChecklist: undefined,
      newChecklist: undefined,
      allChecklists: this.allChecklists
    }

    this.createNewChecklist = this.createNewChecklist.bind(this);
    this.selectChecklist = this.selectChecklist.bind(this);
    this.saveChecklist = this.saveChecklist.bind(this);
    this.addItemToChecklist = this.addItemToChecklist.bind(this);
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
    if (checklist.id) {
      let existingChecklist = this.allChecklists.find(existingChecklist => existingChecklist.id === checklist.id);
      existingChecklist.name = checklist.name;
    }
    else {
      checklist.id = Math.max(...this.allChecklists.map(cl => cl.id)) + 1;
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
      <div className="container"> 
        <div className="row">
          <ChecklistGrid checklists={this.allChecklists} onCreateNewChecklist={this.createNewChecklist} onSelectChecklist={this.selectChecklist} />
          {this.renderRight()}
        </div>
      </div>
    )
  }
}
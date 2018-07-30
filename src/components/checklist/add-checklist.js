import React, { Component } from 'react';


class AddChecklist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      checklist: this.props.checklist
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.createChecklist = this.createChecklist.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  createChecklist(event) {
    event.preventDefault();
    this.props.onSaveChecklist({name: this.state.name});
  }


  render() {
    return (
      <div className="col">
        <h2>Create Checklist</h2>
        <div className="row">
          <form onSubmit={this.createChecklist}>
            <div className="col">    
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleNameChange} />
              </div>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-success">Create</button>
            </div>
          </form> 
        </div>
      </div>
    );
  }
}

export default AddChecklist;
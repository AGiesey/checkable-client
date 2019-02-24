import React from 'react';

class ChecklistItem extends React.Component {
  constructor(props) {
    super(props);

    // TODO: this may be buggy because of the pointer to item.status
    this.state = {...this.props.item}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { name } = this.state
    return (
      <React.Fragment>
        <li className="list-group-item">
          <span className="glyphicon glyphicon-pencil chk-link" aria-hidden="true" data-toggle="modal" data-target="#editChecklistItem"></span>
          &nbsp;&nbsp;<span>{this.props.item.name}</span>
          <span className="chk-float-right">{this.props.item.status.name}</span>
        </li>
        <div className="modal fade" id="editChecklistItem" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Edit Checklist Item</h4>
              </div>
              <form name="editChecklistForm" onSubmit={this.handleSubmit}>
                <div className="modal-body">
                  <div className="col-med-6">
                    <div className="form-group">
                      <label htmlFor="name">Name:</label>
                      <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange}></input>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
      
    )
  }
}

export { ChecklistItem };
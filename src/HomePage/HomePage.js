import React from 'react';

import { ChecklistsService } from '../_services/checklists.service';

import { AppBar } from '../_components/AppBar';

class HomePage extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          user: {},
          checklists: []
      };
  }

  componentDidMount() {
      this.setState({ 
          user: JSON.parse(localStorage.getItem('user')),
          checklists: []
      }, () => {
        ChecklistsService.findAllForUser(this.state.user._id).then(checklists => this.setState({ checklists }));
      });
  }

  render() {
      const { user, checklists } = this.state;

      const checklistsList = () => checklists.map(checklist => <li key={checklist._id}>{checklist.name}</li>)
      return (
        <React.Fragment>
          <AppBar />
          <div className="col-md-6 col-md-offset-3">
            <h3>{`${user.givenName} ${user.surName}'s Checklists:`}</h3>
            <ul>
              {checklistsList()}
            </ul>
          </div>
        </React.Fragment>
      );
  }
}

export { HomePage };
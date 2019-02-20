import React from 'react';
import { Route } from 'react-router-dom';

import { ChecklistsService } from '../_services/checklists.service';

import { AppBar } from '../App/AppBar';
import { ChecklistList } from './ChecklistList';
import { Checklist } from './Checklist';

class ChecklistsPage extends React.Component {
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
    return (
      <React.Fragment>
        <AppBar />
        <Route exact path="/checklists" render={(props) => <ChecklistList {...props} user={user} checklists={checklists}/>} />
        <Route path="/checklists/:checklistId" render={(props) => <Checklist {...props} />} />
      </React.Fragment>
    );
  }
}

export { ChecklistsPage };
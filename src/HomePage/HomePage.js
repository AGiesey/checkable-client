import React from 'react';
import { Link } from 'react-router-dom';

import { ChecklistsService } from '../_services/checklists.service';

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
      });
      ChecklistsService.findAllForUser('5bcbe5000de26a859ef10632').then(checklists => this.setState({ checklists }));
  }

  render() {
      const { user, checklists } = this.state;

      const checklistsList = () => checklists.map(checklist => <li key={checklist._id}>{checklist.name}</li>)
      console.log('USER', user);
      return (
          <div className="col-md-6 col-md-offset-3">
              <h3>Adam Giesey's Checklists:</h3>
              <ul>
                {checklistsList()}
              </ul>
              <p>
                <Link to="/login">Logout</Link>
              </p>
          </div>
      );
  }
}

export { HomePage };
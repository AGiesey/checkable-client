import React from 'react';
import { Route } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ChecklistsService } from '../_services/checklists.service';
import { _addChecklist } from '../_redux/actions';

import { AppBar } from '../App/AppBar';
import { ChecklistList } from './ChecklistList';
import { CreateChecklist } from './CreateChecklist';
import { Checklist } from './Checklist';

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ _addChecklist }, dispatch)
  }
}

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
        ChecklistsService.findAllForUser(this.state.user._id)
          .then(checklists => {
            checklists.forEach(checklist => this.props._addChecklist(checklist));
            this.setState({ checklists });
          });
      });
  }

  render() {
    const { user, checklists } = this.state;
    return (
      <React.Fragment>
        <AppBar />
        <Route exact path="/checklists" render={(props) => <ChecklistList {...props} user={user} checklists={checklists}/>} />
        <Route path="/checklists/checklist/:checklistId" render={(props) => <Checklist {...props} />} />
        <Route path="/checklists/create" render={(props) => <CreateChecklist {...props} userId={user._id} />} />
      </React.Fragment>
    );
  }
}

ChecklistsPage = connect(null, mapDispatchToProps)(ChecklistsPage);
export { ChecklistsPage };
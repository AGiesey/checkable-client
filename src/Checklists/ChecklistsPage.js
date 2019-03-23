import React from 'react';
import { Route } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { _addChecklist, addAllChecklistsForUserAsync } from '../_redux/actions';

import { AppBar } from '../App/AppBar';
import { ChecklistList } from './ChecklistList';
import { CreateChecklist } from './CreateChecklist';
import { Checklist } from './Checklist';

// own props is if the component needs data from its own props to get data from the store
function mapStateToProps(state, ownProps) {
  return {
    isFetching: state.checklists.isFetching,
    checklists: Object.entries(state.checklists.checklists).map(entry => entry[1])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ _addChecklist, addAllChecklistsForUserAsync }, dispatch)
  }
}

class ChecklistsPage extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        user: {},
      };
  }

  componentDidMount() {
      this.setState({ 
          user: JSON.parse(localStorage.getItem('user')),
      }, () => {
        const userId = this.state.user._id;
        this.props.addAllChecklistsForUserAsync(userId);
      });
  }

  render() {
    const { user } = this.state;
    const {checklists, isFetching } = this.props;
    return (
      <React.Fragment>
        <AppBar />
        {isFetching
          ? <p>Loading...</p>
          : (
            <React.Fragment>
              <Route exact path="/checklists" render={(props) => <ChecklistList {...props} user={user} checklists={checklists}/>} />
              <Route path="/checklists/checklist/:checklistId" render={(props) => <Checklist {...props} />} />
              <Route path="/checklists/create" render={(props) => <CreateChecklist {...props} userId={user._id} />} />
            </React.Fragment>
          )
        }  
      </React.Fragment>
    );
  }
}

ChecklistsPage = connect(mapStateToProps, mapDispatchToProps)(ChecklistsPage);
export { ChecklistsPage };
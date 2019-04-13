import React from 'react';
import { Route } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { _addChecklist, addAllChecklistsForUserAsync, addAllCollaborationsForUserAsync, _addUser, _addCurrentUser } from '../_redux/actions';
import { getAllChecklistsArray } from '../_redux/selectors';

import { AppBar } from '../App/AppBar';
import { ChecklistList } from './ChecklistList';
import { CreateChecklist } from './CreateChecklist';
import { Checklist } from './Checklist';

// own props is if the component needs data from its own props to get data from the store
function mapStateToProps(state, ownProps) {
  return {
    isFetching: state.checklists.isFetching,
    checklists: getAllChecklistsArray(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ 
      _addChecklist,
      addAllChecklistsForUserAsync,
      addAllCollaborationsForUserAsync,
      _addUser,
      _addCurrentUser }, dispatch)
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
    const currentUser = JSON.parse(localStorage.getItem('user'))
      this.setState({ 
          user: currentUser,
      }, () => {
        const userId = this.state.user._id;
        this.props._addUser(currentUser);
        this.props._addCurrentUser(currentUser);
        this.props.addAllChecklistsForUserAsync(userId);
        this.props.addAllCollaborationsForUserAsync(userId);
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
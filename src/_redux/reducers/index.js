import { combineReducers } from 'redux';

import checklists from './checklists';
import users from './users';
import collaborations from './collaborations';

export default combineReducers({ checklists, users, collaborations });
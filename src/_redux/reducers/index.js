import { combineReducers } from 'redux';

import checklists from './checklists';
import user from './user';

export default combineReducers({ checklists, user });
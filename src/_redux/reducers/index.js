import { combineReducers } from 'redux';

import checklists from './checklists';

// I know I only have one, but for memorie's sake - this is easier.
export default combineReducers({ checklists });
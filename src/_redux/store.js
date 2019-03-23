import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

// TODO: Remove redux devtools in production env.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware)
  )
);
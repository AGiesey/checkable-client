import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { LoginPage } from '../Login/LoginPage';
import { ChecklistsPage } from '../Checklists/ChecklistsPage';
import { UserProfilePage } from '../UserProfile/UserProfilePage';
import { SignUpPage } from '../SignUp/SignUpPage';

// TODO: implement css in js instead of style tag
var appStyle = {
  paddingTop: '50px',
  width: '100%',
  height: '100vh'
}

const App = (props) => (
  <div className="container" style={appStyle}>
    <div className="col-sm-12">
      <Router>
        <Switch>
          {/* <Redirect from="/" to="/checklists" /> Causing error about redirecting to a route I'm already on */}
          <PrivateRoute path="/checklists" component={ChecklistsPage} />
          <PrivateRoute path="/profile" component={UserProfilePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/sign-up" component={SignUpPage} />
        </Switch>
      </Router>
    </div>
  </div>
)

export { App }
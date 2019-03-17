import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { LoginPage } from '../Login/LoginPage';
import { ChecklistsPage } from '../Checklists/ChecklistsPage';
import { UserProfilePage } from '../UserProfile/UserProfilePage';
import { SignUpPage } from '../SignUp/SignUpPage';
import { SplashPage } from '../Splash/SplashPage';

const App = (props) => (
  <div id="chk-root-container" className="container">
    <div className="col-sm-12">
      <Router>
        <Switch>
          <PrivateRoute path="/checklists" component={ChecklistsPage} />
          <PrivateRoute path="/profile" component={UserProfilePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route exact path="/" component={SplashPage} />
        </Switch>
      </Router>
    </div>
  </div>
)

export { App }
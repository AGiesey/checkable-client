import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from '../_components/PrivateRoute';
import { LoginPage } from '../LoginPage/LoginPage';
import { HomePage } from '../HomePage/HomePage';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';

// TODO: implement css in js instead of style tag
var appStyle = {
  paddingTop: '50px',
  width: '100%',
  height: '100vh'
}

class App extends React.Component {
  
  render() {
    return (
      <div className="container" style={appStyle}>
        <div className="col-sm-12">
          <Router>
            <div>
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute exact path="/profile" component={UserProfilePage} />
              <Route path="/login" component={LoginPage} />
            </div>
          </Router>
        </div>
      </div>
    )
  }
}

export { App }
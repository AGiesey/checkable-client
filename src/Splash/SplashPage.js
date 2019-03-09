import React from 'react';
import { Link } from 'react-router-dom'

class SplashPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
          <h2>Welcome to Checkable!</h2>
          <h4>My graduate thesis project for MSE at California State University, Fullerton</h4>
          <li><Link to={'/login'}>Login</Link></li>
          <li><Link to={'/sign-up'}>Sign Up</Link></li>
      </div>
    )
  }
}

export { SplashPage };
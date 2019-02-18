import React from 'react';

import { AppBar } from '../_components/AppBar';

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {
      user: undefined
    }
  }

  render() {
    return (
      <React.Fragment>
        <AppBar />
        <h3>USER PROFILE PAGE</h3>
      </React.Fragment>
      
    )
  }
}

export { UserProfilePage };
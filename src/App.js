import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, } from '@material-ui/core';
import { checkableLightTheme } from './assets/checkableLightTheme';
import LoginContainer from './app/login/LoginContainer';
import PageWithNav from './app/common/page-with-nav';

var loggedIn = true;


// TODO: make a better name for this.
const LoginState = () => (
    loggedIn
      ? <Switch>
          <Route exact path="/" component={PageWithNav}/>
        </Switch>
      : <Switch>
          <Route exact path="/" component={LoginContainer}/>
        </Switch>
)

function App() {

  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={checkableLightTheme} >
        <Grid container spacing={16}>
        <Router>
          <LoginState />
        </Router>
        </Grid>
      </MuiThemeProvider>
    </React.Fragment>
  )
} 

export default App;

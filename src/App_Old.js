import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, withStyles, } from '@material-ui/core';
import { checkableLightTheme } from './assets/checkableLightTheme';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  app: {
    width: '100%',
    height: '100vh',
    display: 'flex'
  },
  appBody: {
    margin: '64px 0 0 0', // No content behind navbar
    paddingTop: '2px', // Give the navbar drop shadow space.
    display: 'flex',
    flexGrow: '1'
  },
  rightContent: {
    flexGrow: '1',
    textAlign: 'right'
  }
}

const authService = {
  isAuthenticated: false,
  authenticate(cb) {
    isAuthenticated = true;
    console.log('AUTHENTICATE:', this.isAuthenticated);
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    isAuthenticated = false;
    console.log('AUTHENTICATE:', this.isAuthenticated);
    setTimeout(cb, 100);
  }
};

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.authService.isAuthenticated,
    }
    
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  }

  login = () => {
    this.setState({
      loggedIn: true,
    });
  };
  logout = () => {
    this.setState({
      loggedIn: false,
    });
  };

  button = () => (
    this.state.loggedIn
      ? <button onClick={this.props.authService.authenticate}>Logout</button>
      : <button onClick={this.props.authService.signout}>login</button>
  )

  render() {
    return (
      <React.Fragment>
        {this.button()}
      </React.Fragment>
    );
      
  }
}

const Checkable = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authService.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);
     


function App(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={checkableLightTheme}>
        <BrowserRouter>
          <main className={classes.app}>
            <AppBar color='primary'>
              <Toolbar className={classes.toolbar}>
                <Typography variant='title' color='inherit'>CHECKABLE</Typography>
                <div className={classes.rightContent}>
                  <Auth authService={authService}/>
                </div>
              </Toolbar>
            </AppBar>
          
            <div className={classes.appBody}>
              <Route exact path="/" render={() => (
                <Redirect to="/login"></Redirect>
              )}/>
              <Route path="/login" component={Login} />
              <LoggedInRoute path="/home"  component={Home}/>
            </div>  
          
          </main>
        </BrowserRouter>
      </MuiThemeProvider>
    </React.Fragment>
  )
}



const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authService.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

const Home = () => (
  <h2>Home</h2>
)

export default withStyles(styles)(App);

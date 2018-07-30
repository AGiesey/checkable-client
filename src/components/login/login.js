import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>Hello, World!</h2>
        <h3>It is {this.state.date.toLocaleTimeString()}.</h3>  
      </div>
    );
  }
}

export default Login;
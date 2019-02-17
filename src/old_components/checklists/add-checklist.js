import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

// TODO: Separate logical and display components
class AddChecklist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      checklist: this.props.checklist
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.createChecklist = this.createChecklist.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  createChecklist(event) {
    event.preventDefault();
    this.props.onSaveChecklist({name: this.state.name});
  }


  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item xs={6}>
        
          <Paper>
            <AppBar position="static" color="default">
              <Toolbar>
                <Typography variant="headline" component="h3">
                  Create Checklist
                </Typography>
              </Toolbar>
            </AppBar>
            <form onSubmit={this.createChecklist}>
              <TextField 
                label="Name"
                value={this.state.name}
                onChange={this.handleNameChange}
                className={classes.textField}
              />
              <Button type="submit">Create</Button>
            </form> 
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddChecklist);
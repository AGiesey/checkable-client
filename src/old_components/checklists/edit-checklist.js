import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
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

class EditChecklist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      readOnly: true,
    }

    this.addNewChecklistItem = this.addNewChecklistItem.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  toggleItem(item) {
    item.checked = !item.checked;
    console.log(item.id, item.checked);
  }
  
  renderChecklistItem(item) {
    return (
      <React.Fragment>
        <ListItem key={item._id}>
          <Typography>{item.name}</Typography>
        </ListItem>
        <Divider />
      </React.Fragment>
    )
  }

  addNewChecklistItem(event) {
    event.preventDefault();
    let itemName = event.target.name.value;
    this.props.onAddItem({name: itemName, status: 0}, this.props.checklist.id);
    this.setState({addNew: false})
  }

  render() {
    const { classes } = this.props;
    let checklistItems = this.props.checklist.items.map(item => this.renderChecklistItem(item));
    let newChecklistItemForm;

    if (this.state.addNew) {
      newChecklistItemForm = 
      <div >
        <form onSubmit={this.addNewChecklistItem}>
          <div >
            <label>Name</label>
            <input type="text" name="name"  />
          </div>
          <button type="submit" >Save</button>
        </form>
      </div>
    }

    return (
      <React.Fragment>
        <Grid item xs={6}>
          <Paper>
            <AppBar position="static" color="default">
              <Toolbar>
                <Typography variant="headline" component="h3" className={classes.flex}>
                  {this.props.checklist.name} Checklist
                </Typography>
              </Toolbar>
            </AppBar>
          
            {newChecklistItemForm}
            <form onSubmit={this.editChecklist}>
              <TextField 
                label="Name"
                value={this.props.checklist.name}
                onChange={this.handleNameChange}
                className={classes.textField}
              />
              
              <List>
                <ListItem>
                  <Typography variant='title'>Items</Typography>
                  <Button type="button"  onClick={() => this.setState({addNew: true})}>Add</Button>
                </ListItem>
                <Divider />
                {checklistItems}
              </List>  
            </form>
          </Paper>
        </Grid>  
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(EditChecklist);
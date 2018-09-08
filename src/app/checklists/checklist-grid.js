import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  flex: {
    flexGrow: 1,
  },
  clickable: {
    cursor: 'pointer'
  }
}
function ChecklistGrid(props) {
  const { classes } = props;

  let checklists = props.checklists.map(checklist => {
    return (
      <React.Fragment key={checklist._id}>
        <ListItem className={classes.clickable}  onClick={() => props.onSelectChecklist(checklist)}>  
          <Typography className={classes.flex} >{checklist.name}</Typography>
          <Typography>{checklist.items.length}</Typography>
        </ListItem>
        <Divider />
      </React.Fragment>
    )
  });

  return (
    <React.Fragment>
      <Grid item xs={6}>
        <Paper>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="headline" component="h3" className={classes.flex}>
                My Checklists
              </Typography>
              <Button color="secondary" onClick={props.onCreateNewChecklist}>Add</Button>
            </Toolbar>
          </AppBar>
          <List>
            {checklists}
          </List>
        </Paper>
      </Grid>
    </React.Fragment>
  )
}

ChecklistGrid.propTypes = {
  onSelectChecklist: PropTypes.func.isRequired,
  onCreateNewChecklist: PropTypes.func.isRequired,
  checklists: PropTypes.array.isRequired
}

export default withStyles(styles)(ChecklistGrid)

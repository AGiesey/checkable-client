import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ChecklistListItem  extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      totalItemCount: 0,
      myItemCount: 0
    }
  }

  componentDidMount() {
    const checklist = this.props.checklist;
    const totalItems = checklist.items;
    const myItems = checklist.items.filter(item => item.assignedToId === this.props.currentUser._id)

    this.setState({
      totalItemCount: totalItems.length,
      myItemCount: myItems.length
    })
  }

  render() {
    const {checklist} = this.props;
    const {totalItemCount, myItemCount} = this.state;
    return (
      <li className="list-group-item">
        <Link to={`/checklists/checklist/${checklist._id}`}>{checklist.name}</Link>
        <span>{' My Items: ' + myItemCount + ', of ' + totalItemCount + ' total items'}</span>
      </li>
    )
  }
}

ChecklistListItem.propTypes = {
  checklist: PropTypes.object.isRequired
}

export {ChecklistListItem};
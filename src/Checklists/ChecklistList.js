import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import { ChecklistListItem } from './ChecklistListItem';

const ChecklistList = ({ user, checklists }) => (
  <div className="col-md-6 col-md-offset-3">
    <h2>
      {`${user.givenName} ${user.surName}'s checklists:`}
      <Link to="/checklists/create"><button type="button" className="btn btn-default chk-float-right" >Create</button></Link>
    </h2>
    {checklists.map(checklist => <ChecklistListItem key={checklist._id} checklist={checklist} />)}
  </div>
)

ChecklistList.propTypes = {
  user: PropTypes.object,
  checklists: PropTypes.array
}

export { ChecklistList };
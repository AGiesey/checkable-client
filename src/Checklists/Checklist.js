import React from 'react';

import { ChecklistsService } from '../_services/checklists.service';

class Checklist extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      checklist: {}
    }
  }

  componentDidMount() {
    const checklistId = this.props.match.params.checklistId;
    ChecklistsService.findById(checklistId)
      .then(checklist => {
        this.setState({
          loading: false,
          checklist: checklist
        })
      })
  }

  render() {
    const {loading, checklist} = this.state;
    if(loading) {
      return <h4>Loading...</h4>
    }
    return (
      <h3>{checklist.name}</h3>
    )
  }
}

export { Checklist };
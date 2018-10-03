import React, { Component } from 'react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event={};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return {
    event
  }
}

class EventDetailed extends Component {
  render() {
    const { event } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader event={event}/>
          <EventDetailedInfo event={event}/>
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
            <EventDetailedSidebar attendees={event.attendees}/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(EventDetailed);

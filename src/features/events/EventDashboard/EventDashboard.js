import React, { Component } from 'react';
import { Grid  } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { connect } from 'react-redux'
import { deleteEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';
import { firestoreConnect } from 'react-redux-firebase';
//We use this to connect event dashboard with firestore through its bindings.
//Look at the bottom of this file.

const mapStateToProps = (state) => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading,
})

const mapDispatchToProps = {
  deleteEvent,
}

class EventDashboard extends Component {
// DELETE
  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId)
  }

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent />
    return(
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={this.handleDeleteEvent}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  firestoreConnect([{collection: "events"}])(EventDashboard) //Firestore is listening to "events". Every time our event changes, firestore is listening.
);

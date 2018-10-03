import React, { Component } from 'react';
import { Grid  } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { connect } from 'react-redux'
import { deleteEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';
import { firestoreConnect } from 'react-redux-firebase';

const mapStateToProps = (state) => ({
  events: state.events,
  loading: state.async.loading,
})

const mapDispatchToProps = {
  deleteEvent,
}

class EventDashboard extends Component {
// DELETE
  handleDeleteEvent = (eventId) => () => {
    // const updatedEvents = this.state.events.filter(event => event.id !== eventId);
    // this.setState({
    //   events: updatedEvents
    // })
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
  firestoreConnect([{collection: "events"}])(EventDashboard)
);

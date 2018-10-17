import React, { Component } from 'react';
import { Grid, Button, Loader  } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { connect } from 'react-redux'
import {  getEventsForDashboard } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';
import { firestoreConnect } from 'react-redux-firebase';
//Use this to connect event dashboard with firestore through its bindings.
//Look at the bottom of this file.

const mapStateToProps = (state) => ({
  // events: state.firestore.ordered.events,
  // how events was mapped before querying
  events: state.events,
  loading: state.async.loading,
})

const mapDispatchToProps = {
  getEventsForDashboard
}

class EventDashboard extends Component {
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
  }

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      })
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length-1];
    console.log(lastEvent)

    let next = await this.props.getEventsForDashboard(lastEvent);
    console.log(next)

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      })
    }
  }


  render() {
    const { loading } = this.props;
    const { moreEvents, loadedEvents} = this.state;
    return(
      <Grid>
        <Grid.Column width={10}>
          <EventList loading={loading} moreEvents={moreEvents} events={loadedEvents} getNextEvents={this.getNextEvents}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  firestoreConnect([{collection: "events"}])(EventDashboard) //Firestore is listening to "events". Every time our event changes, firestore is listening.
);

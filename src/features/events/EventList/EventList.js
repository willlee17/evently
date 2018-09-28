import React, { Component } from 'react';
import EventListItem from './EventListItem'

class EventList extends Component {
  render() {
    const { events, openEvent, deleteEvent } = this.props
    return(
      <div>
        {events.map(event => (
          <EventListItem key={event.id} event={event} openEvent={openEvent} deleteEvent={deleteEvent}/>)
        )}
      </div>
    )
  }
}

export default EventList;

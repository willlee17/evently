import React, { Component } from 'react';
import { Segment, Item, Icon, Button , List, Label } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { objectToArray } from '../../../app/common/util/helpers';

class EventListItem extends Component {
  render() {
    const { event } = this.props
    return(
          <Segment.Group  style={{boxShadow: "0px 0px 5px #888888"}}>
            <Segment>
              <Item.Group>
                <Item>
                  <Item.Image as={Link} to={`/profile/${event.hostUid}`} size="tiny" circular src={event.hostPhotoURL} />
                  <Item.Content>
                    <Item.Header as={Link} to={`/event/${event.id}`}>{event.title}</Item.Header>
                    <Item.Description>
                      Hosted by <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
                    </Item.Description>
                    {event.canceled && (
                      <Label style={{top: "-40px"}} ribbon="right" color="red" content="Event canceled"/>
                    )}
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
            <Segment>
              <span>
                <Icon name="clock" /> {format(event.date.toDate(), "dddd Do MMMM")} at {format(event.date.toDate(), "HH:mm")} |
                <Icon name="marker" /> {event.venue}
              </span>
            </Segment>
            <Segment secondary>
              <List horizontal>
                {event.attendees &&
                  objectToArray(event.attendees).map((attendee ) => (
                  <EventListAttendee key={attendee.id} attendee={attendee}/>
                ))}
              </List>
            </Segment>
            <Segment clearing>
              <span>{event.description}</span>
               <Button inverted size="large" as={Link} to={`/event/${event.id}`} className="event-btn" floated="right" content="View" />    {/*NO MORE onClick={openEvent(event)} */}
            </Segment>
          </Segment.Group>
    )
  }
}

export default EventListItem;

import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

const emptyEvent = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: '',
}

class EventForm extends Component {
  state = {
    event: emptyEvent
  }

  componentDidMount() {
    if(this.props.selectedEvent) {
      this.setState({
        event: this.props.selectedEvent
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.selectedEvent !== this.props.selectedEvent) {
      this.setState({
        event: nextProps.selectedEvent || emptyEvent
      })
    }
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.event.id) {
      this.props.updateEvent(this.state.event)
    } else {
    this.props.createEvent(this.state.event)
    }
  }

  onInputChange = (event) => {
    const newEvent = this.state.event;
    newEvent[event.target.name] = event.target.value
    this.setState({
      event: newEvent,
    })
  }


  render() {
    const { event } = this.state
    return (
        <Segment>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Field>
              <label>Event Title</label>
              <input value = {event.title} onChange={this.onInputChange} name="title" placeholder="First Name" />
            </Form.Field>
            <Form.Field>
              <label>Event Date</label>
              <input value = {event.date} onChange={this.onInputChange} name="date" type="date" placeholder="Event Date" />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input value = {event.city} onChange={this.onInputChange} name="city" placeholder="City event is taking place" />
            </Form.Field>
            <Form.Field>
              <label>Venue</label>
              <input value = {event.venue} onChange={this.onInputChange} name="venue" placeholder="Enter the Venue of the event" />
            </Form.Field>
            <Form.Field>
              <label>Hosted By</label>
              <input value = {event.hostedBy} onChange={this.onInputChange} name="hostedBy" placeholder="Enter the name of person hosting" />
            </Form.Field>
            <Button positive type="submit">
              Submit
            </Button>
            <Button type="button" onClick={this.props.cancelForm}>Cancel</Button>
          </Form>
        </Segment>
    )
  }
}

export default EventForm

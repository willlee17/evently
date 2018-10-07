import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockApi';
import { toastr } from 'react-redux-toastr';
import { createNewEvent } from '../../app/common/util/helpers';
import moment from 'moment';

export const createEvent = (event) => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(`events`, newEvent) //.add will create a new ID for us.
      //Lookup table for future querying
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true,
      })
      toastr.success('Success!', "Your event has been created." )
    }
    catch (error) {
      toastr.error("Oops...", "Something went wrong...")
    }
  }
}

export const updateEvent = (event) => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    if(event.date !== getState().firestore.ordered.events[0].date) {
        event.date = moment(event.date).toDate()
    }
    try {
      await firestore.update(`events/${event.id}`, event)
      toastr.success('Success!', "Your event has been updated." )
    }
    catch (error) {
      toastr.error("Oops...", "Something went wrong...")
    }
  }
}

export const cancelToggle = (cancelled, eventId) => async (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are you sure you want to cancel the event?"
    : "This will reactivate the event."
  try {
    toastr.confirm(message, {
      onOk: () =>
      firestore.update(`events/${eventId}`, {
        cancelled: cancelled
      })
    })
  }
  catch (error) {
    console.log(error)
  }
}


export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  }
}

export const fetchEvent = (events) => {
  return {
    type: FETCH_EVENTS,
    payload: events,
  }
}

// Originally hooked up to store.dispatch(loadEvents()) before we implememnted firestore
export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart())
      let events = await fetchSampleData();
      dispatch (fetchEvent(events))
      dispatch(asyncActionFinish())
    }
    catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}

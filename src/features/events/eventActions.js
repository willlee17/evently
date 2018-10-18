import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockApi';
import { toastr } from 'react-redux-toastr';
import { createNewEvent } from '../../app/common/util/helpers';
import moment from 'moment';
import firebase from '../../app/config/firebase'; //To get access to firebase API directly instead of going thru firestore


export const createEvent = (event) => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL; //Since users are already logged in. firebase.profile is available. I don't want to get photoURL from the one above.
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(`events`, newEvent) //.add will create a new ID.
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

export const cancelToggle = (canceled, eventId) => async (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const message = canceled
    ? "Are you sure you want to cancel the event?"
    : "This will reactivate the event."
  try {
    toastr.confirm(message, {
      onOk: () =>
      firestore.update(`events/${eventId}`, {
        canceled: canceled
      })
    })
  }
  catch (error) {
    console.log(error)
  }
}


export const fetchEvent = (events) => {
  return {
    type: FETCH_EVENTS,
    payload: events,
  }
}

export const getEventsForDashboard = (lastEvent) => async (dispatch, getState) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore();

  const eventsRef = firestore.collection('events')
   try {
     dispatch(asyncActionStart())
     // Check to see if lastEvent even exists. then get the last document and start at this last document for pagination.
     let startAfter = lastEvent && await firestore.collection('events').doc(lastEvent.id).get();
     let query;

     lastEvent ? (query = eventsRef.orderBy('date').where('date', ">=", today).startAfter(startAfter).limit(2))
      : (query = eventsRef.orderBy('date').where('date', ">=", today).limit(2)) //what happens on initial load where there is no lastevent.

      let querySnap = await query.get();

      if (querySnap.docs.length === 0) {
        dispatch(asyncActionFinish())
        return querySnap;
      }

     let events = [];

     for (let i = 0; i < querySnap.docs.length; i++) {
       let event = {...querySnap.docs[i].data(), id: querySnap.docs[i].id}
        //this will spread al of the fields from the .data method using the spread operator,
        // and also get the id of our document as well and store it into the event variable
        events.push(event)
     }
     dispatch({
       type: FETCH_EVENTS,
       payload: {events}
     })
     dispatch(asyncActionFinish())
     return querySnap;
   }
   catch (error) {
     console.log(error)
     dispatch(asyncActionError())
   }
}

export const addEventComment = (eventId, values, parentId) => async (dispatch, getState, {getFirebase}) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;
  let newComment = {
    parentId: parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || '/assets/eventCategories/user.png',
    uid: user.uid,
    text: values.comment,
    date: Date.now(),
  }
  try {
    await firebase.push(`event_chat/${eventId}`, newComment)
  }
  catch (error) {
    console.log(error)
    toastr.error("Oops...", "Something went wrong...")
  }
}

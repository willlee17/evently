import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockApi';
import { toastr } from 'react-redux-toastr';

export const createEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({type: CREATE_EVENT,
      payload: {
        event
      }
    });
    toastr.success('Success!', "Your event has been created." )
    }
    catch (error) {
      toastr.error("Oops...", "Something went wrong...")
    }
  }
}

export const updateEvent = (event) => {
  return async dispatch => {
    try {
      dispatch({type: UPDATE_EVENT,
      payload: {
        event
      }
    });
    toastr.success('Success!', "Your event has been updated." )
    }
    catch (error) {
      toastr.error("Oops...", "Something went wrong...")
    }
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

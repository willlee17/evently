import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './eventConstants';

export const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    payload: {
      event           //Reducers can take objects but not  thunk functions or anything like that
    }
  }
}

export const updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: {
      event
    }
  }
}

export const updateEvent = (eventID) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventID
    }
  }
}

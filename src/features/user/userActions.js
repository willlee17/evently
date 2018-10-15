import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';
import firebase from '../../app/config/firebase'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { FETCH_EVENTS } from '../events/eventConstants';

export const updateProfile = (user) => async (dispatch, getState, {getFirebase}) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user; //the beauty here is that updatedUser is the user object except without the two props we don't want

// Work with DateInput.js
  if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate(); //this converts our moment object into a JS date that firebase is happy with
  }

  try {
    await firebase.updateProfile(updatedUser); //this comes form getFirebase() and affects the user in firestore.. This updateProfile is different from the one in authActions.
    toastr.success("Success", "Profile updated!")
  }
  catch (error) {
    console.log(error)
  }
}

export const uploadProfileImage = (file, fileName ) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase() ;
  const firestore = getFirestore();
  const imageName = cuid();
  const user = firebase.auth().currentUser; //this is synchronous actually
  const path = `${user.uid}/user_images`; //each user has their own folder.
  const options = {
    name: imageName
  }

  try {
    // Upload the file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options); //the file is the blob
    //get url of image from the snapshot.
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    // get userdoc from firestore.
    let userDoc = await firestore.get(`users/${user.uid}`);
    // Then check if the user alredy has a photo inside. If not, update profile with new image.
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({ //this one updates the firestore document
        photoURL: downloadURL
      })
      await user.updateProfile({ //this one updates the auth profile inside firebase authentication
        photoURL: downloadURL
      })
    }
    // add the new photo to photos collection
    return await firestore.add({
      collection: 'users',
      doc: user.uid,
      subcollections: [{collection: 'photos'}]
    }, {
      name: imageName,
      url: downloadURL
    })
  }
  catch (error) {
    console.log(error)
    throw new Error("Problem uploading photo...")
  }
}

export const deletePhoto = (photo) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`)
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{collection: "photos", doc: photo.id}]
    })
  }
  catch (error) {
    console.log(error)
    throw new Error("Problem deleting photo...")
  }
}

export const setMainPhoto = (photo) => async (dispatch, getState, {getFirebase}) => {
  const firebase = getFirebase();
  try {
    return await firebase.updateProfile({
      photoURL: photo.url
    })
  }
  catch (error) {
    console.log(error)
    throw new Error("Problem setting the main photo...")
  }
}

export const goingToEvent = (event) => async (dispatch, getState, {getFirestore, getFirebase}) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  const photoURL = getState().firebase.profile.photoURL; //We don't want photoURL from firestore.auth() above. We want it from firebase.profile which is technically our user's firetsore document.
  const attendee = { //this should match the data input titles in the firestore.
    going: true,
    joinDate: Date.now(),
    photoURL: photoURL || '/assets/user.png',
    displayName: user.displayName,
    host: false
  }
  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee // object key
    })
    await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
      eventId: event.id,
      userUid: user.uid,
      eventDate: event.date,
      host: false,
    })
    toastr.success("Success!", "You have signed up for the event!");
  }
  catch (error) {
    console.log(error)
    toastr.error("Oops...", "Problem signing up to the event...")
  }
}

export const cancelGoingToEvent = (event) => async (dispatch, getState, {getFirestore, getFirebase}) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    //remove the attendee object from the object map inside the event.
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete() //this is how to delete an individual field in firestore. weird i know.
    })
    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    toastr.success("Success!", "You've been removed from the event.");
  }
  catch (error) {
    console.log(error)
    toastr.error("Oops...", "Problem canceling out of the event...")
  }
}

export const getUserEvents = (userUid, activeTab) => async(dispatch, getState) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const today = new Date(Date.now());
  let eventsRef = firestore.collection('event_attendee');
  let query;
  switch(activeTab) {
    case 1: //past events
    query = eventsRef.where('userUid', '==', userUid).where('eventDate', "<=", today).orderBy("eventDate", 'desc');
    break;
    case 2: //future
    query = eventsRef.where('userUid', '==', userUid).where('eventDate', '>=', today).orderBy("eventDate");
    break;
    case 3: //hosted events by the user
    query = eventsRef.where('userUid', '==', userUid).where('host', '==', true).orderBy("eventDate", 'desc');
    break;
    default:
    query = eventsRef.where('userUid', '==', userUid).orderBy("eventDate", 'desc');
  }
  try {
    let querySnap = await query.get()
    let events = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let event = await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get();
      events.push({...event.data(), id: event.id})
    }

    //Here i'm dispatching to the events reducer since it's already setup for fetch events.
    dispatch({type: FETCH_EVENTS, payload: {events}})

    dispatch(asyncActionFinish())
  }
  catch (error) {
    dispatch(asyncActionError())
  }
}

import { closeModal } from '../modals/modalActions';
import { SubmissionError, reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';

// This is the updated login action where I finally implemented login with firebase. Reducers no longer necessary hehe.
export const loginUser = (creds) => {
  return async (dispatch, getState, {getFirebase}) => { // Authentication is also with getFirebase and not just getFirestore.
    const firebase = getFirebase();
    try {
        await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
        dispatch(closeModal())
    }
    catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: "Login Failed..."
      })
    }
  }
}

export const registerUser = (user) => async (dispatch, getState, {getFirebase, getFirestore})=> {
//getFirebase to acces firebase authentication and firestore for the user profile which is where users are stored
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      // Create the user in auth
      let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      // update the auth profile
      await createdUser.updateProfile({
        displayName: user.displayName
      })
      // create a new profile in firestore
      let newUser = {
        uid: firebase.auth().currentUser.uid,
        email: firebase.auth().currentUser.email,
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      }
      await firestore.set(`users/${newUser.uid}`, {...newUser})
      dispatch(closeModal())
    }
    catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

  export const socialLogin = (selectedProvider) =>
    async (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
      try {
        dispatch(closeModal())
        let user = await firebase.login({
          provider: selectedProvider,
          type: "popup"
        })
        // If I don't do below, firestore is going to show everything about a user. Only want these 3 fields.
        if(user.additionalUserInfo.isNewUser) {
          await firestore.set(`users/${user.user.uid}`, {
            displayName: user.profile.displayName,
            photoURL: user.profile.avatarUrl,
            createdAt: firestore.FieldValue.serverTimestamp(),
          })
        }
        //If the user is not a new user, in configureStore, in rrfConfig, updateProfileOnLogin  is set to false for that.
      }
      catch (error) {
        console.log(error)
      }
    }

  export const updatePassword = (creds) =>
    async (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      const user = firebase.auth().currentUser;
      try {
        await user.updatePassword(creds.newPassword1) //firebase method
        await dispatch(reset('account')) //the name of the form. reset is a redux form method.
        toastr.success("Success", "Your password has been updated!")
      }
      catch (error) {
        throw new SubmissionError({
          _error: error.message
        })
      }
    }

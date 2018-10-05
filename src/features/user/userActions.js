import moment from 'moment';
import { toastr } from 'react-redux-toastr'

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
  const user = firebase.auth().currentUser; //this is synchronous actually
  const path = `${user.uid}/user_images`; //each user has their own folder.
  const options = {
    name: fileName
  }

  try {
    // Upload the file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    //get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    // get userdoc from firestore.
    let userDoc = await firestore.get(`users/${user.uid}`);
    // Then check if the user alredy has a photo inside. If not, update profile with new image.
    if (!userDoc.data().photoURL) {
      await firebase.uploadProfile({ //this one updates the firestore document
        photoURL: downloadURL
      })
      await user.updateProfile({ //this one updates the profile inside firebase authentication
        photoURL: downloadURL
      })
    }
    // add the new photo to photos collection
    return await firestore.add({
      collection: 'users',
      doc: user.uid,
      subcollections: [{collection: 'photos'}]
    }, {
      name: fileName,
      url: downloadURL
    })
  }
  catch (error) {
    console.log(error)
    throw new Error("Problem uploading photo...")
  }
}

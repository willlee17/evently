import firebase from 'firebase';
import 'firebase/firestore'; //To get firestore

const firebaseConfig = {
    apiKey: "AIzaSyDQqJ58vHa5NAi4ouG00KISZWCXyqvg7M4",
    authDomain: "evently-66809.firebaseapp.com",
    databaseURL: "https://evently-66809.firebaseio.com",
    projectId: "evently-66809",
    storageBucket: "evently-66809.appspot.com",
    messagingSenderId: "239822962646"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings)

export default firebase;

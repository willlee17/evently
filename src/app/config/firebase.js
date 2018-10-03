import firebase from 'firebase';
import 'firebase/firestore'; //How to get firestore. Looks weird lol

const firebaseConfig = {
    apiKey: "AIzaSyDQqJ58vHa5NAi4ouG00KISZWCXyqvg7M4",
    authDomain: "evently-66809.firebaseapp.com",
    databaseURL: "https://evently-66809.firebaseio.com",
    projectId: "evently-66809",
    storageBucket: "evently-66809.appspot.com",
    messagingSenderId: "239822962646"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase; 

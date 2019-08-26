import firebase from 'firebase';
import 'firebase/firestore';

// firebase init goes here
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBVE31-qgb76NSyCWn5WrzMtEDYwDgbgxE',
  authDomain: 'freedom-derby.firebaseapp.com',
  databaseURL: 'https://freedom-derby.firebaseio.com/',
  projectId: 'freedom-derby',
  storageBucket: 'freedom-derby.appspot.com',
  messagingSenderId: '1038574637211',
});

// firebase utils
const db = firebaseApp.firestore();

// firebase collections
const bidsCollection = db.collection('bids');
const lotsCollection = db.collection('lots');

export {
  db,
  bidsCollection,
  lotsCollection,
};

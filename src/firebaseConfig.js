import firebase from 'firebase';
import 'firebase/firestore';

// firebase init goes here
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDaZWqbMLcX0GalwxXjyJYJ4ZKQb1Q3k70',
  authDomain: 'houndrace-4a14f.firebaseapp.com',
  databaseURL: 'https://houndrace-4a14f.firebaseio.com/',
  projectId: 'houndrace-4a14f',
  storageBucket: 'houndrace-4a14f.appspot.com',
  messagingSenderId: '45616596464',
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

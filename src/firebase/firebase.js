import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBo9s4hOrPcd6pwyIgPxagwh1y4UTpj_sU',
  authDomain: 'softuni-react-c48f6.firebaseapp.com',
  databaseURL: 'https://softuni-react-c48f6.firebaseio.com',
  projectId: 'softuni-react-c48f6',
  storageBucket: 'softuni-react-c48f6.appspot.com',
  messagingSenderId: '487081783472',
  appId: '1:487081783472:web:90fffd1f322a3060bd4b75',
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;

import firebase from 'firebase/app';
import firebaseConfig from './config';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

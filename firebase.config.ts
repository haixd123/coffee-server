import firebase from 'firebase';
import initializeApp = firebase.initializeApp;


export const firebaseConfig = {
  apiKey: 'AIzaSyBLnNomPuo9kTdFMtSoArR0QUAFPEwA-9I',
  authDomain: 'coffee2-c0521.firebaseapp.com',
  projectId: 'coffee2-c0521',
  storageBucket: 'coffee2-c0521.appspot.com',
  messagingSenderId: '716579486971',
  appId: '1:716579486971:web:c637fd5c9ba7dc8e32845e'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const appConfig: ApplicationConfig = {
//
// }


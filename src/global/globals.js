

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAjXCbrXtemRnOKqprWEC8F6cTeRVIEy7A",
    authDomain: "reactnative-auth-34523.firebaseapp.com",
    databaseURL: "https://reactnative-auth-34523.firebaseio.com",
    storageBucket: "reactnative-auth-34523.appspot.com",
    messagingSenderId: "545111860164"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


module.exports = {
    FirebaseApp: firebaseApp
};

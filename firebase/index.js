var firebase = require('firebase/app')
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
var firebaseConfig = {
    apiKey: "AIzaSyAUQKhtHmG1umeZIQb0nivKoy756TS66Io",
    authDomain: "bimtechsf.firebaseapp.com",
    databaseURL: "https://bimtechsf.firebaseio.com",
    projectId: "bimtechsf",
    storageBucket: "bimtechsf.appspot.com",
    messagingSenderId: "242390184440",
    appId: "1:242390184440:web:c6b08a35ca31b882"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage();
module.exports = { auth, firestore, storage, firebase }
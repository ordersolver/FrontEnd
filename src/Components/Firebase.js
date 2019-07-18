import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore';
import "firebase/auth";

var config = {
    apiKey: "AIzaSyAxxWMpPuH54bp03L-j7sHmvYgnxC1RTHc",
    authDomain: "ordersolver.firebaseapp.com",
    databaseURL: "https://ordersolver.firebaseio.com",
    projectId: "ordersolver",
    storageBucket: "ordersolver.appspot.com",
    messagingSenderId: "255372037843",
    appId: "1:255372037843:web:2e64f7562d268fbf"
};
const firebaseApp = firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase, firebaseApp
}
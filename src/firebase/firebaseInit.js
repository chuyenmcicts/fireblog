import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCd033OelNogf_d5FpftUTXtJ0GrgkGI34",
    authDomain: "fireblogs-899af.firebaseapp.com",
    projectId: "fireblogs-899af",
    storageBucket: "fireblogs-899af.appspot.com",
    messagingSenderId: "803716789561",
    appId: "1:803716789561:web:7e798ecfae113660f164e8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
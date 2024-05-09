import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCbyVTNY-4szlMdIYgd1OkIalRxR4rrlIs",
    authDomain: "gamejin-684bd.firebaseapp.com",
    databaseURL: "https://gamejin-684bd-default-rtdb.firebaseio.com",
    projectId: "gamejin-684bd",
    storageBucket: "gamejin-684bd.appspot.com",
    messagingSenderId: "1053657359309",
    appId: "1:1053657359309:web:90a276c1a888d77e799a84"
});

const db = firebaseApp.firestore();

const auth = firebase.auth();
let Storage = firebase.storage();


export { db, auth, Storage }


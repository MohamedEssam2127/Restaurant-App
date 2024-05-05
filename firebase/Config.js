// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAhakrb0ANfAM4pmg51pShaYoFE1mDeok4",
  authDomain: "project-ae9c5.firebaseapp.com",
  projectId: "project-ae9c5",
  storageBucket: "project-ae9c5.appspot.com",
  messagingSenderId: "340604733872",
  appId: "1:340604733872:web:c999f195608fe122cf6e75",
  measurementId: "G-XVKEXFRY5H"
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export { app, db, auth,firebase };

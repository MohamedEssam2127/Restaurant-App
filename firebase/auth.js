import { auth, db } from "./Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";

import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  QuerySnapshot,
  Timestamp,
  orderBy,
  updateDoc,

} from "firebase/firestore";

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

async function register(email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return cred;
}

async function addUser(uid, email, username, phone, address) {
  const data  = {
    uid: uid,
    email: email,
    username: username,
    phone: phone,
    address: address,
    isAdmin: false,
  }
  try {
    await setDoc(doc(db, "users", uid), data);
    console.log("Document written with ID: ", uid);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



export { register, addUser };

import { auth, db } from "./Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const data = {
    uid: uid,
    email: email,
    username: username,
    phone: phone,
    address: address,
    isAdmin: false,
  };
  try {
    await setDoc(doc(db, "users", uid), data);
    console.log("Document written with ID: ", uid);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function login(email, password) {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

async function logout() {
  await signOut(auth);
  await AsyncStorage.removeItem("@user");
}

async function changePass(email) {
  await sendPasswordResetEmail(auth, email);
}

export { register, addUser, login, changePass, logout };

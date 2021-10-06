import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";
import { FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-X6n5gxbi7bpApWPlyIvAvIY43AsB-tg",
  authDomain: "facebook-clone-31e98.firebaseapp.com",
  projectId: "facebook-clone-31e98",
  storageBucket: "facebook-clone-31e98.appspot.com",
  messagingSenderId: "314868701789",
  appId: "1:314868701789:web:53a26ef62eb7939af5cbb4",
};

let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const facebookProvider = new FacebookAuthProvider();

export { db, storage, auth, facebookProvider };

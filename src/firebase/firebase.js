import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKEQHT5lwoSD2DaGonUU5ywe1OAIxRvss",
  authDomain: "comenta-f531f.firebaseapp.com",
  projectId: "comenta-f531f",
  storageBucket: "comenta-f531f.appspot.com",
  messagingSenderId: "998221293420",
  appId: "1:998221293420:web:8d9b2cc679480e6f8ef549",
};

const app = firebase.initializeApp(firebaseConfig);

export function getFirebase() {
  return app;
}

export const database = firebase.firestore();

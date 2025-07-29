import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "eco-explorer-be3cr",
  appId: "1:584130378792:web:cdc41561381bbcec9dc91d",
  storageBucket: "eco-explorer-be3cr.firebasestorage.app",
  apiKey: "AIzaSyDYnzDs5N8U1wtCadY2EsgH162a_GCOaIc",
  authDomain: "eco-explorer-be3cr.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "584130378792"
};

// Inicializar Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

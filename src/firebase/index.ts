// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU2X8XyLT2u6x10iwiSaQ-UhG1D7RvZ_w",
  authDomain: "chat-real-time-web-app.firebaseapp.com",
  projectId: "chat-real-time-web-app",
  storageBucket: "chat-real-time-web-app.appspot.com",
  messagingSenderId: "513013994274",
  appId: "1:513013994274:web:5485a3f0e761aa148b4b7b",
  measurementId: "G-PGRRNF8FKF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
const analytics = getAnalytics(app);

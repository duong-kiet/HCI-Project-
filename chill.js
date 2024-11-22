// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxIZJrUA2GRSTNS-6roS0fAgOJDQ7a5jY",
  authDomain: "tuong-tac-nguoi-may.firebaseapp.com",
  projectId: "tuong-tac-nguoi-may",
  storageBucket: "tuong-tac-nguoi-may.firebasestorage.app",
  messagingSenderId: "625857698328",
  appId: "1:625857698328:web:75a98b107fecf2657b416d",
  measurementId: "G-YF5VVJ069V"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(FirebaseApp);

export {FirebaseApp, db };
// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { async } from "regenerator-runtime";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB7I7-zWX936DIAwNQ-J_4UGYpCnkc_UJs",
//   authDomain: "tuongtacnguoimay-75c39.firebaseapp.com",
//   projectId: "tuongtacnguoimay-75c39",
//   storageBucket: "tuongtacnguoimay-75c39.appspot.com",
//   messagingSenderId: "175824208602",
//   appId: "1:175824208602:web:79f5661a66676a81355be3"
// };

// Initialize Firebase
// const FirebaseApp = initializeApp(firebaseConfig);

// Lấy tham chiếu đến collection trong Firestore
// var myCollection = firestore.collection('articles');

// Lấy dữ liệu từ collection
// myCollection.get().then(function(querySnapshot) {
//   querySnapshot.forEach(function(doc) {
//     // doc.data() chứa dữ liệu từ Firestore
//     var data = doc.data();
//     console.log(data);
//   });
// });

// const db = getFirestore(FirebaseApp);


// export {FirebaseApp, db };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAxIZJrUA2GRSTNS-6roS0fAgOJDQ7a5jY",
//   authDomain: "tuong-tac-nguoi-may.firebaseapp.com",
//   projectId: "tuong-tac-nguoi-may",
//   storageBucket: "tuong-tac-nguoi-may.firebasestorage.app",
//   messagingSenderId: "625857698328",
//   appId: "1:625857698328:web:75a98b107fecf2657b416d",
//   // measurementId: "G-YF5VVJ069V"
// };

// // Initialize Firebase
// const FirebaseApp = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// const db = getFirestore(FirebaseApp);

// console.log("Hi")

// import { collection, getDocs } from "firebase/firestore"; 

// const querySnapshot = await getDocs(collection(db, "articles"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

// export { db };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTqL7lLtETUpLy3KPeej9lZjxhRpux58E",
  authDomain: "hci-project-900bd.firebaseapp.com",
  projectId: "hci-project-900bd",
  storageBucket: "hci-project-900bd.firebasestorage.app",
  messagingSenderId: "196361975987",
  appId: "1:196361975987:web:d5afd90ac5b3d0888558c6",
  measurementId: "G-VC0TEDB6R3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

console.log("Hi")

import { collection, getDocs } from "firebase/firestore"; 

const querySnapshot = await getDocs(collection(db, "articles"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

export { db };
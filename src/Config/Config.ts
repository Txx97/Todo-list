import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAsRJKOZZIw_3tE70GgE2m4GPmq0w_FHG4",
  authDomain: "todoappwithreactandfirestore.firebaseapp.com",
  projectId: "todoappwithreactandfirestore",
  storageBucket: "todoappwithreactandfirestore.appspot.com",
  messagingSenderId: "607782108115",
  appId: "1:607782108115:web:10413daf972896166e8d26",
  // measurementId: "G-JG8TVXR2L4"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSo7uLzI4WcuQZUTf49Z66k6s28HoiGxY",
  authDomain: "journalapp-login.firebaseapp.com",
  projectId: "journalapp-login",
  storageBucket: "journalapp-login.appspot.com",
  messagingSenderId: "175298625358",
  appId: "1:175298625358:web:49f3946c872d941d7f681f"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
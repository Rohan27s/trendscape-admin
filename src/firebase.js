// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNWQsQJGqRNQhxr1aj3_9fCzRbaCsTJVg",
  authDomain: "trenscape-a9a47.firebaseapp.com",
  projectId: "trenscape-a9a47",
  storageBucket: "trenscape-a9a47.appspot.com",
  messagingSenderId: "1033488204142",
  appId: "1:1033488204142:web:da00264bc3435eb1edc17f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
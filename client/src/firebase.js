// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBASE_API,
  authDomain: "nemo-estate.firebaseapp.com",
  projectId: "nemo-estate",
  storageBucket: "nemo-estate.appspot.com",
  messagingSenderId: "617753154809",
  appId: "1:617753154809:web:2581d37dcb3e3ed826fe28",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

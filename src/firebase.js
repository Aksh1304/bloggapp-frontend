// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "blog-app-ccc4f.firebaseapp.com",
  projectId: "blog-app-ccc4f",
  storageBucket: "blog-app-ccc4f.appspot.com",
  messagingSenderId: "750222668005",
  appId: "1:750222668005:web:e08f48e37c79e8437ba40c"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig); 

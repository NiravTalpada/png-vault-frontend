import {initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlYNVbCvX7WJ77qqpSMhcAhaAhLl8CUdg",
    authDomain: "pngvalt.firebaseapp.com",
    projectId: "pngvalt",
    storageBucket: "pngvalt.appspot.com",
    messagingSenderId: "114540192010",
    appId: "1:114540192010:web:74f0147958b16424b9daf3",
    measurementId: "G-3007FTXKYK",
  };
  
    const FireBase = initializeApp(firebaseConfig);
    const imgDB = getStorage(FireBase);
    const textDB = getFirestore(FireBase);
export {imgDB,textDB};
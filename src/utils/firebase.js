// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbRCuEdfx5foQIHmFkYONbnuSFKrmEaLE",
  authDomain: "netflixgpt-5faf3.firebaseapp.com",
  projectId: "netflixgpt-5faf3",
  storageBucket: "netflixgpt-5faf3.appspot.com",
  messagingSenderId: "284196749000",
  appId: "1:284196749000:web:1c70665b5e3a13ae846ffd",
  measurementId: "G-2KV45MH2YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdSJlVAXJILcZ64e1h9feCyw8SXbX3ITk",
  authDomain: "weather-a41fd.firebaseapp.com",
  projectId: "weather-a41fd",
  storageBucket: "weather-a41fd.appspot.com",
  messagingSenderId: "922995714925",
  appId: "1:922995714925:web:53c182b464a034e8584864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getDatabase(app)
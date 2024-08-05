import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRWBe8OpMY1UqzUzKLQQeusGVM-rTdFMA",
  authDomain: "teske-wedding-cdfd7.firebaseapp.com",
  projectId: "teske-wedding-cdfd7",
  storageBucket: "teske-wedding-cdfd7.appspot.com",
  messagingSenderId: "914530076104",
  appId: "1:914530076104:web:1c96c0c9fe1421b445ecfd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

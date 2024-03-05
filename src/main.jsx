import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSenFzJeMNHo4LkQPEtvR56XqgDdcay04",
  authDomain: "coderhouse-ecommerce-jr.firebaseapp.com",
  projectId: "coderhouse-ecommerce-jr",
  storageBucket: "coderhouse-ecommerce-jr.appspot.com",
  messagingSenderId: "918112580501",
  appId: "1:918112580501:web:46a42a60a915688d3cfc9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

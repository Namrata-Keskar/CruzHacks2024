import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { useState, useEffect, useContext, createContext } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyAnTUdfqBVFNQzV7lS_0Ua-xVQK5gV0M00",
    authDomain: "nand-hackathon.firebaseapp.com",
    projectId: "nand-hackathon",
    storageBucket: "nand-hackathon.appspot.com",
    messagingSenderId: "467700481799",
    appId: "1:467700481799:web:44ce56041df0358ec9cfa2"
  };

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

export default app;


import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAH-pBMcZ5CutrybeG4fSnDwjqUz5Swe0w",
  authDomain: "cineflix-23dba.firebaseapp.com",
  databaseURL: "https://cineflix-23dba-default-rtdb.firebaseio.com",
  projectId: "cineflix-23dba",
  storageBucket: "cineflix-23dba.appspot.com",
  messagingSenderId: "471944561562",
  appId: "1:471944561562:web:e142ed6df750290934b023"
};


const app = initializeApp(firebaseConfig);
const Auth= getAuth()


export {app,Auth};
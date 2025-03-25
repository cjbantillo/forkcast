import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { getAuth } from 'firebase/auth'; // If you need authentication

const firebaseConfig = {
  apiKey: "AIzaSyDtObO9-9IRFmMc3hd8VGjVrh6tWBqs9uI",
  authDomain: "mobile-meal-planner-51c68.firebaseapp.com",
  projectId: "mobile-meal-planner-51c68",
  storageBucket: "mobile-meal-planner-51c68.appspot.com",
  messagingSenderId: "583906509994",
  appId: "1:583906509994:android:d2e7432df9bd1e6e9b7cd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // If using authentication

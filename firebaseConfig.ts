import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtObO9-9IRFmMc3hd8VGjVrh6tWBqs9uI",
  authDomain: "mobile-meal-planner-51c68.firebaseapp.com",
  projectId: "mobile-meal-planner-51c68",
  storageBucket: "mobile-meal-planner-51c68.firebasestorage.app",
  messagingSenderId: "583906509994",
  appId: "1:583906509994:android:d2e7432df9bd1e6e9b7cd3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const logout = () => signOut(auth);
const db = getFirestore(app);

export default app;
export { db };

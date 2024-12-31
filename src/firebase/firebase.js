import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "filmyverse-2b934.firebaseapp.com",
  projectId: "filmyverse-2b934",
  storageBucket: "filmyverse-2b934.firebasestorage.app",
  messagingSenderId: "769143294361",
  appId: "1:769143294361:web:30d92d6135a2a3c9faeb08"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;
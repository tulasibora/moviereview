import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOK5UHw1NgD_tYiEhGt-1i9DbgdMTOz-Q",
  authDomain: "cinema-reviews.firebaseapp.com",
  projectId: "cinema-reviews",
  storageBucket: "cinema-reviews.appspot.com",
  messagingSenderId: "815481518591",
  appId: "1:815481518591:web:04233a9b624d0a8dfd8fca",
  measurementId: "G-4477LJLQ31",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

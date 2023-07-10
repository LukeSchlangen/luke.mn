import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS9mxhjBptlh9pKhXgRPPnU3ENpTjZyQs",
  authDomain: "lukes-workout.firebaseapp.com",
  projectId: "lukes-workout",
  storageBucket: "lukes-workout.appspot.com",
  messagingSenderId: "934921328952",
  appId: "1:934921328952:web:f3ad37140f98e1901d49cd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

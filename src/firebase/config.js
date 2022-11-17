import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';



export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_KEY,
  authDomain: "eshop-5120e.firebaseapp.com",
  projectId: "eshop-5120e",
  storageBucket: "eshop-5120e.appspot.com",
  messagingSenderId: "612720932985",
  appId: "1:612720932985:web:8c05c1266bce3ee513fca8"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app

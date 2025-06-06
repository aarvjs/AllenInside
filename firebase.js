// 🔥 STEP 1: Firebase Setup (firebase.js)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGG4M2JnPuzlio8Kpp7qEBSDRv6wECGpc",
  authDomain: "alleninside.firebaseapp.com",
  projectId: "alleninside",
  storageBucket: "alleninside.appspot.com",
  messagingSenderId: "385669006106",
  appId: "1:385669006106:android:058a7ede88f0cd456fa2a3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

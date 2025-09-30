import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "numsports09.firebaseapp.com",
  projectId: "numsports09",
  storageBucket: "numsports09.firebasestorage.app",
  messagingSenderId: "960923858623",
  appId: "1:960923858623:web:047facf323ceb1846c780a",
  measurementId: "G-8DNG1GVRPQ"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}
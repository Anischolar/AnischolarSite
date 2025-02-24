import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLvJt0V368MlixRCmS5Kt5-sSrbrAb3wI",
  authDomain: "anischolar-14dd6.firebaseapp.com",
  projectId: "anischolar-14dd6",
  storageBucket: "anischolar-14dd6.appspot.com",
  messagingSenderId: "611136525503",
  appId: "1:611136525503:web:a9ec22c5a717106199e20a",
  measurementId: "G-VSC7628L83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };

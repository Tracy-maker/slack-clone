import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9EDKXhNJCp3f0qorLHHmIGORNq0sFIVc",
  authDomain: "slack-clone-b5212.firebaseapp.com",
  projectId: "slack-clone-b5212",
  storageBucket: "slack-clone-b5212.appspot.com",
  messagingSenderId: "573901722643",
  appId: "1:573901722643:web:abfb8ff0793ae694ef9be6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };

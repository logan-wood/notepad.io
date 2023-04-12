import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBI6Z_GHuX9nxZSEqMn3K5kixdiwSGtzvo",
  authDomain: "notepad-io-database.firebaseapp.com",
  projectId: "notepad-io-database",
  storageBucket: "notepad-io-database.appspot.com",
  messagingSenderId: "604905895982",
  appId: "1:604905895982:web:80de2a89ee98c5f5ff07bf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
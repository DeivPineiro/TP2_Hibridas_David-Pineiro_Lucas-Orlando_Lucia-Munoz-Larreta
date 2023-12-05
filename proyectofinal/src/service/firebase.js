import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCcOFfGy6rtotuhYxbPyokIq7tzyueWoGk",
    authDomain: "plantopia-157e3.firebaseapp.com",
    projectId: "plantopia-157e3",
    storageBucket: "plantopia-157e3.appspot.com",
    messagingSenderId: "1079860584663",
    appId: "1:1079860584663:web:ea0367a9e4869c2c275092"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

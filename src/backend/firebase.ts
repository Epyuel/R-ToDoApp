import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//collection ref
export const userCollection = collection(db, "user");
export const toDoCollection = collection(db, "toDo");
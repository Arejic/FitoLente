import { initializeApp } from "firebase/app";

import { 
    getFirestore 
} from "firebase/firestore";

import {
    getStorage
} from "firebase/storage";

import {
    getAuth
} from "firebase/auth";



const firebaseConfig = {

    apiKey: "AIzaSyCGm3rYRUQa9chbdP32vggxb0KconEf_-s",

    authDomain:
    "fitolente-9b607.firebaseapp.com",

    projectId:
    "fitolente-9b607",

    storageBucket:
    "fitolente-9b607.firebasestorage.app",

    messagingSenderId:
    "1063025997839",

    appId:
    "1:1063025997839:web:6af9858ea579ebf318cb7a"

};



const app = initializeApp(firebaseConfig);



const db = getFirestore(app);

const storage = getStorage(app);

const auth = getAuth(app);



export {
    db,
    storage,
    auth
};
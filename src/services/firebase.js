import { initializeApp } from "firebase/app";

import { 
    getFirestore 
} from "firebase/firestore";



const firebaseConfig = {

  apiKey: "AIzaSyDerpGcS24YmMUpLzx9LD3-Y4Kt24G5l4g",

  authDomain: "fitolente.firebaseapp.com",

  projectId: "fitolente",

  storageBucket: "fitolente.firebasestorage.app",

  messagingSenderId: "619347552103",

  appId: "1:619347552103:web:66588d013a6a88f81c31c2",

};




const app =
initializeApp(firebaseConfig);



const db =
getFirestore(app);



export {
    db
};
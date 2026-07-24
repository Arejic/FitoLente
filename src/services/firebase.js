// Firebase
import { initializeApp } from "firebase/app";

// Firestore
import { getFirestore } from "firebase/firestore";

// Storage
import { getStorage } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDerpGcS24YmMUpLzx9LD3-Y4Kt24G5l4g",
  authDomain: "fitolente.firebaseapp.com",
  projectId: "fitolente",
  storageBucket: "fitolente.firebasestorage.app",
  messagingSenderId: "619347552103",
  appId: "1:619347552103:web:66588d013a6a88f81c31c2"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Inicializar Storage
const storage = getStorage(app);

// Exportar
export { db, storage };
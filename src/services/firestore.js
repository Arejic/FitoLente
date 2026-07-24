import { db } from "./firebase";
import { 
    collection, 
    addDoc,
    getDocs,
    orderBy,
    query
} from "firebase/firestore";


export async function guardarDiagnostico(datos){

    try{

        const doc = await addDoc(
            collection(db,"diagnosticos"),
            datos
        );

        console.log("Guardado:",doc.id);

        return doc.id;

    }catch(error){

        console.error(error);
        throw error;
    }

}



export async function obtenerDiagnosticos(){

    try{

        const q = query(
            collection(db,"diagnosticos"),
            orderBy("fecha","desc")
        );


        const snapshot = await getDocs(q);


        return snapshot.docs.map(doc=>({

            id:doc.id,
            ...doc.data()

        }));


    }catch(error){

        console.error(error);
        throw error;
    }

}
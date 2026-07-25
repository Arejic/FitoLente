import {

collection,

addDoc,

getDocs,

query,

orderBy

} from "firebase/firestore";



import {
    db
} from "./firebase";





export async function guardarDiagnostico(datos){


try{


const docRef =
await addDoc(

collection(
db,
"diagnosticos"
),

datos

);



return docRef.id;



}catch(error){


console.error(
"Error guardando diagnóstico:",
error
);


throw error;


}



}







export async function obtenerDiagnosticos(){


try{


const q =
query(

collection(
db,
"diagnosticos"
),


orderBy(
"fecha",
"desc"
)

);




const snapshot =
await getDocs(q);





return snapshot.docs.map(doc=>(


{

id:doc.id,

...doc.data()

}



));




}catch(error){


console.error(
"Error obteniendo historial:",
error
);



throw error;


}


}
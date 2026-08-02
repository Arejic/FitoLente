import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

signOut

} from "firebase/auth";


import {

auth,

db

} from "./firebase";


import {

addDoc,

collection,

query,

where,

getDocs

} from "firebase/firestore";





// ===============================
// REGISTRO
// ===============================


export async function registrarUsuario(
email,
password,
nombre,
perfil
){


const resultado =

await createUserWithEmailAndPassword(

auth,

email,

password

);



const uid =
resultado.user.uid;



await addDoc(

collection(
db,
"usuarios"
),

{


uid,

nombre,

perfil,

email


}

);



return resultado.user;


}






// ===============================
// LOGIN
// ===============================


export async function iniciarSesion(

email,

password

){


const resultado =

await signInWithEmailAndPassword(

auth,

email,

password

);



return resultado.user;


}






// ===============================
// PERFIL
// ===============================


export async function obtenerPerfil(uid){


const q = query(

collection(
db,
"usuarios"
),


where(
"uid",
"==",
uid
)


);



const snap =
await getDocs(q);



if(snap.empty){

return null;

}



return {


id:
snap.docs[0].id,


...snap.docs[0].data()


};


}






export async function cerrarSesion(){


await signOut(auth);


}
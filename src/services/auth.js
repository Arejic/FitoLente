/*
 * Proyecto: FitoLente
 * Autores:
 * Josue Arturo Juarez Rangel
 * Areli Jimenez Contreras
 * Juan Manuel Valerio Astorga
 *
 * Universidad Tecnológica de Tula-Tepeji
 */
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";


import {
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";


import {
    auth,
    db
} from "./firebase";




// ==========================
// REGISTRO USUARIO
// ==========================

export async function registrarUsuario(
    correo,
    password,
    datos
){

    const resultado =

        await createUserWithEmailAndPassword(
            auth,
            correo,
            password
        );


    const uid =
        resultado.user.uid;



    await setDoc(

        doc(
            db,
            "usuarios",
            uid
        ),

        {

            uid,

            email: correo,

            ...datos

        }

    );


    return resultado.user;

}





// ==========================
// LOGIN
// ==========================

export async function iniciarSesion(
    correo,
    password
){

    const resultado =

        await signInWithEmailAndPassword(
            auth,
            correo,
            password
        );


    return resultado.user;

}





// ==========================
// PERFIL
// ==========================

export async function obtenerPerfil(uid){

    console.log("Buscando UID:", uid);

    const referencia =
        doc(
            db,
            "usuarios",
            uid
        );

    const documento =
        await getDoc(
            referencia
        );

    console.log(
        "¿Existe documento?:",
        documento.exists()
    );

    if(
        !documento.exists()
    ){

        return null;

    }

    console.log(
        "Datos documento:",
        documento.data()
    );

    return {

        id:
        documento.id,

        ...documento.data()

    };

}





// ==========================
// CERRAR SESIÓN
// ==========================

export async function cerrarSesion(){

    await signOut(
        auth
    );

}
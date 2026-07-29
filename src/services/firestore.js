import {

    collection,

    addDoc,

    getDocs,

    query,

    where,

    orderBy

} from "firebase/firestore";


import {
    db
} from "./firebase";

import {
    obtenerUsuario
} from "./sesion";


// =================================
// USUARIOS
// =================================



export async function registrarUsuario(usuario){


    const docRef =
        await addDoc(

            collection(
                db,
                "usuarios"
            ),

            usuario

        );


    return docRef.id;


}








export async function buscarUsuario(

    nombre,

    password,

    perfil

){



    const q =
        query(


            collection(
                db,
                "usuarios"
            ),



            where(
                "nombre",
                "==",
                nombre
            ),



            where(
                "password",
                "==",
                password
            ),



            where(
                "perfil",
                "==",
                perfil
            )


        );





    const snapshot =
        await getDocs(q);





    if(snapshot.empty){

        return null;

    }





    return {


        id:
        snapshot.docs[0].id,


        ...snapshot.docs[0].data()


    };


}









// =================================
// DIAGNOSTICOS
// =================================
export async function guardarDiagnostico(datos){

    try{

        const usuario = obtenerUsuario();

        if(!usuario){

            throw new Error(
                "No existe una sesión activa."
            );

        }

        if(!usuario.id){

            throw new Error(
                "La sesión no contiene un usuario válido."
            );

        }

        const diagnostico = {

            ...datos,

            usuarioId:
                usuario.id,

            usuario:
                usuario.nombre,

            perfil:
                usuario.perfil,

            fecha:
                datos.fecha ||
                new Date().toISOString()

        };

        const docRef =
            await addDoc(

                collection(
                    db,
                    "diagnosticos"
                ),

                diagnostico

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


// =================================
// HISTORIAL POR USUARIO
// =================================



export async function obtenerDiagnosticosUsuario(usuarioId){



    try{



        const q = query(

    collection(
        db,
        "diagnosticos"
    ),

    where(
        "usuarioId",
        "==",
        usuarioId
    )

);






        const snapshot =
            await getDocs(q);






        return snapshot.docs.map(doc => ({



            id:
            doc.id,


            ...doc.data()



        }));





    }catch(error){



        console.error(

            "Error historial usuario:",

            error

        );



        throw error;


    }



}









// =================================
// TODOS LOS DIAGNOSTICOS
// =================================



export async function obtenerTodosDiagnosticos(){



    try{



        const q = query(



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







        return snapshot.docs.map(doc => ({



            id:
            doc.id,


            ...doc.data()



        }));





    }catch(error){



        console.error(

            "Error obteniendo diagnósticos:",

            error

        );



        throw error;


    }



}
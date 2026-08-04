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

    subirImagen

} from "./storage";


import {

    obtenerUsuario

} from "./sesion";




// =================================
// OBTENER PERFIL USUARIO
// =================================

export async function obtenerPerfilUsuario(uid){


    try{


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



    }catch(error){


        console.error(

            "Error obteniendo perfil:",

            error

        );


        throw error;


    }


}








// =================================
// GUARDAR DIAGNOSTICO
// =================================

export async function guardarDiagnostico(

    datos,

    imagen

){


    try{



        const usuario =
            obtenerUsuario();





        console.log(

            "Usuario guardando diagnóstico:",

            usuario

        );






        if(!usuario){


            throw new Error(

                "No existe sesión activa"

            );


        }







        let imagenURL = null;






        // =============================
        // SUBIR IMAGEN A SUPABASE
        // =============================

        if(imagen){


            imagenURL =

            await subirImagen(

                imagen,

                usuario.uid

            );


        }








        // =============================
        // REPORTE FIRESTORE
        // =============================

        const diagnostico = {


            ...datos,



            imagenURL,



            usuarioId:

            usuario.id,



            uid:

            usuario.uid,



            usuario:

            usuario.nombre || "",



            perfil:

            usuario.perfil || "",



            email:

            usuario.email || "",



            fecha:

            new Date().toISOString()


        };







        console.log(

            "Guardando en Firestore:",

            diagnostico

        );







        const docRef =

        await addDoc(

            collection(

                db,

                "diagnosticos"

            ),

            diagnostico

        );







        return {


            id:

            docRef.id,



            imagenURL



        };







    }catch(error){



        console.error(

            "Error guardando diagnóstico:",

            error

        );



        throw error;



    }


}









// =================================
// HISTORIAL USUARIO
// =================================

export async function obtenerDiagnosticosUsuario(

    usuario

){



    try{



        console.log(

            "Buscando historial:",

            usuario

        );





        let documentos = [];







        // Buscar por UID Firebase

        if(usuario.uid){


            const qUid = query(

                collection(

                    db,

                    "diagnosticos"

                ),


                where(

                    "uid",

                    "==",

                    usuario.uid

                )

            );




            const snapUid =

            await getDocs(qUid);




            documentos.push(

                ...snapUid.docs

            );


        }








        // Buscar por ID usuario

        if(usuario.id){



            const qId = query(

                collection(

                    db,

                    "diagnosticos"

                ),


                where(

                    "usuarioId",

                    "==",

                    usuario.id

                )

            );





            const snapId =

            await getDocs(qId);





            documentos.push(

                ...snapId.docs

            );



        }








        const resultado =

        Array.from(


            new Map(

                documentos.map(doc=>[


                    doc.id,


                    {


                        id:

                        doc.id,


                        ...doc.data()


                    }


                ])

            ).values()


        );








        console.log(

            "Historial encontrado:",

            resultado

        );






        return resultado;






    }catch(error){



        console.error(

            "Error historial:",

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






        return snapshot.docs.map(doc=>({



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
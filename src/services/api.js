/*
 * Proyecto: FitoLente
 * Autores:
 * Josue Arturo Juarez Rangel
 * Areli Jimenez Contreras
 * Juan Manuel Valerio Astorga
 *
 * Universidad Tecnológica de Tula-Tepeji
 */
import { auth } from "./firebase";



const API_URL =
    "http://127.0.0.1:8001";




// =================================
// OBTENER TOKEN FIREBASE
// =================================

async function obtenerToken(){


    const usuario =
        auth.currentUser;



    if(!usuario){

        throw new Error(
            "Usuario no autenticado"
        );

    }



    const token =
        await usuario.getIdToken();



    return token;


}






// =================================
// HEADERS JSON
// =================================

async function obtenerHeaders(){


    const token =
        await obtenerToken();



    return {

        "Content-Type":
            "application/json",


        "Authorization":
            `Bearer ${token}`

    };


}






// =================================
// GUARDAR DIAGNOSTICO
// =================================

export async function guardarDiagnosticoAPI(datos){


    try{


        const respuesta =
        await fetch(

            `${API_URL}/diagnosticos`,

            {

                method:"POST",


                headers:
                    await obtenerHeaders(),


                body:
                    JSON.stringify(datos)

            }

        );




        if(!respuesta.ok){


            const error =
            await respuesta.text();


            console.error(
                "API guardar:",
                error
            );


            throw new Error(
                "Error guardando diagnóstico"
            );


        }



        return await respuesta.json();



    }
    catch(error){


        console.error(
            error
        );


        throw error;


    }


}







// =================================
// OBTENER DIAGNOSTICOS
// =================================

export async function obtenerDiagnosticosAPI(){


    try{


        const respuesta =
        await fetch(

            `${API_URL}/diagnosticos`,

            {

                method:"GET",


                headers:
                    await obtenerHeaders()

            }

        );





        if(!respuesta.ok){


            const error =
            await respuesta.text();



            console.error(
                error
            );


            throw new Error(
                "Error obteniendo diagnósticos"
            );


        }




        return await respuesta.json();



    }
    catch(error){


        console.error(
            "Error historial:",
            error
        );


        throw error;


    }


}







// =================================
// ELIMINAR DIAGNOSTICO
// =================================

export async function eliminarDiagnosticoAPI(id){


    try{


        const respuesta =
        await fetch(

            `${API_URL}/diagnosticos/${id}`,

            {

                method:"DELETE",


                headers:
                    await obtenerHeaders()

            }

        );





        if(!respuesta.ok){


            const error =
            await respuesta.text();



            console.error(
                error
            );


            throw new Error(
                "Error eliminando diagnóstico"
            );


        }





        return await respuesta.json();



    }
    catch(error){


        console.error(
            "Error eliminar:",
            error
        );


        throw error;


    }


}








// =================================
// SUBIR IMAGEN SUPABASE
// PASANDO POR FASTAPI
// =================================

export async function subirImagenAPI(archivo){


    try{


        const token =
        await obtenerToken();




        const formulario =
        new FormData();



        formulario.append(

            "archivo",

            archivo

        );





        const respuesta =
        await fetch(

            `${API_URL}/imagenes`,

            {

                method:"POST",


                headers:{

                    "Authorization":
                    `Bearer ${token}`

                },


                body:
                formulario

            }

        );





        if(!respuesta.ok){


            const error =
            await respuesta.text();



            console.error(
                "Error imagen:",
                error
            );


            throw new Error(
                "Error subiendo imagen"
            );


        }





        return await respuesta.json();



    }
    catch(error){


        console.error(
            error
        );


        throw error;


    }


}

import {

    ref,

    uploadBytes,

    getDownloadURL

} from "firebase/storage";


import {
    storage
} from "./firebase";



export async function subirImagen(
    archivo,
    usuarioId
){


    try{


        const nombreArchivo =
            Date.now()
            +
            "_"
            +
            archivo.name;



        const ruta =
            `diagnosticos/${usuarioId}/${nombreArchivo}`;



        const imagenRef =
            ref(
                storage,
                ruta
            );



        await uploadBytes(

            imagenRef,

            archivo

        );



        const url =
            await getDownloadURL(
                imagenRef
            );



        return url;



    }catch(error){


        console.error(
            "Error subiendo imagen:",
            error
        );


        throw error;


    }


}
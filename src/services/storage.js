import { supabase } from "./supabase";


// =================================
// SUBIR IMAGEN A SUPABASE STORAGE
// =================================

export async function subirImagen(
    archivo,
    usuarioId
){

    try{


        if(!archivo){

            throw new Error(
                "No existe archivo de imagen"
            );

        }



        const extension =
            archivo.name
            .split(".")
            .pop();



        const nombreArchivo =
            `${crypto.randomUUID()}.${extension}`;



        const ruta =
            `diagnosticos/${usuarioId}/${nombreArchivo}`;





        const {
            error
        } =
        await supabase.storage

        .from("imagenes")

        .upload(

            ruta,

            archivo,

            {
                cacheControl:"3600",

                upsert:false

            }

        );





        if(error){

            throw error;

        }







        const {
            data
        } =
        supabase.storage

        .from("imagenes")

        .getPublicUrl(

            ruta

        );





        //console.log(
        //    "Imagen subida:",
        //    data.publicUrl
        //);





        return data.publicUrl;






    }catch(error){


        console.error(

            "Error subiendo imagen:",

            error

        );



        throw error;



    }


}
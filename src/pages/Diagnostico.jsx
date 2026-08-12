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
    useEffect,
    useRef,
    useState
} from "react";


import {
    useLocation,
    useNavigate
} from "react-router-dom";


import {
    analizarImagen
} from "../services/ia";


import {
    obtenerUsuario
} from "../services/sesion";

import {
    subirImagenAPI,
    guardarDiagnosticoAPI
} from "../services/api";


import DiagnosticoPrimaria
    from "../components/DiagnosticoPrimaria";


import DiagnosticoUniversidad
    from "../components/DiagnosticoUniversidad";





function Diagnostico(){


    const navigate =
        useNavigate();


    const location =
        useLocation();



    const imagenRef =
        useRef(null);



    const usuario =
        obtenerUsuario();





    const [imagen,setImagen] =
        useState(null);



    const [estado,setEstado] =
        useState(
            "Preparando análisis..."
        );



    const [resultado,setResultado] =
        useState(null);



    const [mostrarModal,setMostrarModal] =
        useState(false);





    const perfil =
        usuario?.perfil
        ?.toString()
        .trim()
        .toLowerCase();




    const esEstudiante =
        perfil === "estudiante" ||
        perfil === "alumno";






    const info =
        resultado
        ?
        obtenerInformacion(resultado.clase)
        :
        null;









useEffect(()=>{


    if(!usuario){


        navigate("/");


        return;


    }




    if(!location.state?.archivo){


        setEstado(
            "No se recibió ninguna imagen"
        );


        return;


    }





    const archivo =
        location.state.archivo;




    const url =
        URL.createObjectURL(
            archivo
        );



    setImagen(url);



    analizar(url);




    return()=>{


        URL.revokeObjectURL(url);


    };


},[]);









async function analizar(url){


    try{


        setEstado(
            "Cargando inteligencia artificial..."
        );



        const img =
            new Image();




        img.src =
            url;





        img.onload =
        async()=>{


            try{


                imagenRef.current =
                    img;



                setEstado(
                    "Analizando imagen..."
                );



                const respuesta =
                    await analizarImagen(img);




                console.log(
                    "Resultado IA:",
                    respuesta
                );




                setResultado(
                    respuesta
                );



                setEstado(
                    "Análisis completado"
                );



            }
            catch(error){


                console.error(
                    error
                );


                setEstado(
                    "Error al analizar imagen"
                );


            }



        };



    }
    catch(error){


        console.error(
            error
        );


        setEstado(
            "Error al cargar imagen"
        );


    }



}





function regresar(){

    const origen = location.state?.origen;

    if(origen === "prehistorial"){

        navigate("/prehistorial");

    }
    else{

        navigate("/carga");

    }

}


async function generarReporte(){


try{


    if(!resultado){

        return;

    }




    if(!usuario){


        navigate("/");


        return;


    }





    const datos =
        obtenerInformacion(
            resultado.clase
        );






// ===============================
// SUBIR IMAGEN SUPABASE
// ===============================


const respuestaImagen =
await subirImagenAPI(

    location.state.archivo

);


const imagenURL =
respuestaImagen.imagenURL;





console.log(
    "Imagen subida:",
    imagenURL
);






// ===============================
// GUARDAR EN BACKEND
// ===============================

console.log(
    "Datos enviados API:",
    {
        usuarioId:
            usuario.uid ||
            usuario.id,

        resultado:
            resultado.clase,

        confianza:
            resultado.confianza,

        imagenURL
    }
);
const guardado =
await guardarDiagnosticoAPI({

    usuarioId:
        usuario.uid ||
        usuario.id,


    usuario:
        usuario.nombre ||
        "Usuario FitoLente",


    perfil:
        usuario.perfil ||
        "sin perfil",


    cultivo:
        "desconocido",


    resultado:
        resultado.clase,


    confianza:
        resultado.confianza,


    descripcion:
        datos.descripcion,


    recomendacion:
        datos.recomendacion,


    imagenURL:
        imagenURL

});





console.log(
    "Diagnóstico guardado:",
    guardado
);





// ===============================
// ABRIR REPORTE
// ===============================


navigate(

"/reporte",

{

state:{


    origen:

        "diagnostico",



    reporte:{


        resultado:

            resultado.clase,



        confianza:

            resultado.confianza,



        imagenURL:



            imagenURL,



        usuario:


            usuario.nombre ||
            "Usuario FitoLente",



        perfil:


            usuario.perfil,



        fecha:


            new Date()
            .toISOString()


    }


}


}


);





}
catch(error){


console.error(
    "Error generando reporte:",
    error
);


}



}







function nuevaFoto(){


    navigate(
        "/carga"
    );


}








return(


<div className="mobile-container">



<header className="header">


<h1>

FitoLente

</h1>


</header>






<main className="content">





{

esEstudiante

?

<DiagnosticoPrimaria

    imagen={imagen}

    estado={estado}

    info={info}

    resultado={resultado}

/>



:

<DiagnosticoUniversidad

    imagen={imagen}

    estado={estado}

    info={info}

    resultado={resultado}

/>


}






<div className="button-row">


<button

className="btn"

onClick={nuevaFoto}

>

Nueva foto

</button>





<button

className="btn"

onClick={()=>setMostrarModal(true)}

>

Menú

</button>



</div>





</main>
{
mostrarModal &&



<div className="modal-fondo">



<div className="modal">





<h2>

¿Desea generar un reporte antes de salir?

</h2>





<p>

Si selecciona "Sí", el diagnóstico será almacenado y se abrirá el reporte.

</p>







<div className="modal-botones">





<button

className="btn"

onClick={()=>navigate("/menu")}

>

No

</button>







<button

className="btn"

disabled={!resultado}

onClick={generarReporte}

>

Sí

</button>







</div>





</div>



</div>


}









<div className="footer-bar"></div>




</div>



);


}









function obtenerInformacion(clase){



const datos = {



sana:{


nombre:

"Planta sana",


descripcion:

"La imagen no presenta síntomas evidentes de enfermedades o presencia de plagas.",


recomendacion:

"Continuar con el riego adecuado, mantener buena iluminación y realizar revisiones periódicas."


},







alternaria:{


nombre:

"Alternaria",


descripcion:

"Enfermedad causada por hongos del género Alternaria que provoca manchas en las hojas y puede reducir la capacidad fotosintética.",


recomendacion:

"Retirar hojas afectadas, mejorar ventilación del cultivo y evitar mojar el follaje durante el riego."


},







bacterial_spot_rot:{


nombre:

"Mancha bacteriana / pudrición bacteriana",


descripcion:

"Infección bacteriana que produce lesiones en tejidos vegetales y puede avanzar rápidamente.",


recomendacion:

"Eliminar partes infectadas, desinfectar herramientas y evitar exceso de humedad."


},







hernia_col:{


nombre:

"Hernia de la col",


descripcion:

"Enfermedad que afecta las raíces de plantas de la familia de las coles.",


recomendacion:

"Mejorar drenaje del suelo, retirar plantas afectadas y realizar rotación de cultivos."


},







mildiu_velloso:{


nombre:

"Mildiu velloso",


descripcion:

"Enfermedad favorecida por humedad elevada y poca circulación de aire.",


recomendacion:

"Reducir humedad, mejorar ventilación y retirar hojas afectadas."


},







pulgon:{


nombre:

"Pulgón",


descripcion:

"Plaga que se alimenta de la savia de la planta debilitando su desarrollo.",


recomendacion:

"Realizar inspecciones frecuentes y aplicar métodos de control autorizados."


},







ring_spot:{


nombre:

"Mancha en anillo",


descripcion:

"Enfermedad foliar que produce lesiones circulares en las hojas.",


recomendacion:

"Retirar hojas afectadas y mantener limpieza y ventilación del cultivo."


},







trips:{


nombre:

"Trips",


descripcion:

"Plaga que afecta tejidos vegetales reduciendo el desarrollo de la planta.",


recomendacion:

"Realizar monitoreo y aplicar control biológico o tratamiento autorizado."


}




};






return datos[clase] || {



nombre:

clase,



descripcion:

"No existe información disponible para este diagnóstico.",



recomendacion:

"Consultar con un especialista o realizar una nueva fotografía."


};




}






export default Diagnostico;

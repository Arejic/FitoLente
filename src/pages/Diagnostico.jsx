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
    guardarDiagnostico
} from "../services/firestore";


import DiagnosticoPrimaria
    from "../components/DiagnosticoPrimaria";

import DiagnosticoUniversidad
    from "../components/DiagnosticoUniversidad";

function Diagnostico(){


    const navigate = useNavigate();

    const location = useLocation();

    const imagenRef = useRef(null);



    const usuario = obtenerUsuario();



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





    const info = resultado
        ? obtenerInformacion(resultado.clase)
        : null;



const perfil =
    usuario?.perfil
        ?.toString()
        .trim()
        .toLowerCase();


const esEstudiante =
    perfil === "estudiante" ||
    perfil === "alumno";



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



    },[]);









    async function analizar(url){


        try{


            setEstado(
                "Cargando inteligencia artificial..."
            );



            await new Promise(
                resolve =>
                setTimeout(resolve,500)
            );



            setEstado(
                "Analizando imagen..."
            );



            const img =
                new Image();



            img.src=url;



            img.onload = async()=>{


                try{


                    imagenRef.current =
                        img;



                    const respuesta =
                        await analizarImagen(img);



                    setResultado(
                        respuesta
                    );



                    setEstado(
                        "Análisis completado"
                    );



                }catch(error){


                    console.error(error);


                    setEstado(
                        "Error al analizar imagen"
                    );


                }


            };



        }catch(error){


            console.error(error);


            setEstado(
                "Error al cargar imagen"
            );


        }


    }









    async function generarReporte(){


        try{


            if(!resultado){

                return;

            }



            if(!usuario){


                alert(
                    "Debe iniciar sesión"
                );


                navigate("/");


                return;

            }






            const datos =
                obtenerInformacion(
                    resultado.clase
                );







          const guardado =
    await guardarDiagnostico(

        {
            resultado:
                resultado.clase,

            confianza:
                resultado.confianza,

            descripcion:
                datos.descripcion,

            recomendacion:
                datos.recomendacion
        },

        location.state.archivo

    );








            navigate(

    "/reporte",

    {

        state:{

        imagen:
            guardado.imagenURL,

        resultado,


            nombre:
                datos.nombre,


            descripcion:
                datos.descripcion,


            recomendacion:
                datos.recomendacion,


            confianza:
                resultado.confianza,


            perfil:
                usuario.perfil,


            usuario:
                usuario.nombre || "Usuario FitoLente",


            fecha:
                new Date()


        }

    }

);


        }

        catch(error){


            console.error(

                "Error guardando diagnóstico:",

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

onClick={generarReporte}

disabled={!resultado}

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

nombre:"Planta sana",

tipo:"Sin daños visibles",

nivel:"Bajo",

descripcion:
"La imagen no presenta síntomas evidentes de enfermedades o presencia de plagas.",


sintomas:[
"Coloración normal de hojas",
"Crecimiento uniforme",
"No se observan manchas o deformaciones"
],


causas:
"No se identifican factores de riesgo visibles.",


acciones:[
"Continuar con riego adecuado",
"Mantener buena iluminación",
"Realizar revisiones periódicas"
],


prevencion:[
"Realizar monitoreo constante para detectar cambios tempranos."],

recomendacion:
    "Continuar con el riego adecuado, mantener una buena iluminación y realizar revisiones periódicas para conservar la planta en buen estado."

},




alternaria:{

nombre:"Alternaria",

tipo:"Enfermedad fúngica",

nivel:"Medio",

descripcion:
"Enfermedad causada por hongos del género Alternaria que provoca manchas en las hojas y puede reducir la capacidad fotosintética de la planta.",


sintomas:[
"Manchas circulares oscuras",
"Zonas amarillentas alrededor de lesiones",
"Secamiento progresivo de hojas"
],


causas:
"Favorecida por humedad elevada, poca ventilación y restos vegetales infectados.",


acciones:[
"Retirar hojas afectadas",
"Evitar mojar el follaje",
"Mejorar ventilación del cultivo"
],


prevencion:[
"Mantener separación adecuada entre plantas y eliminar residuos infectados."],

 recomendacion:
    "Retirar las hojas afectadas, mejorar la ventilación del cultivo y evitar mojar el follaje durante el riego para disminuir la propagación del hongo."


},





bacterial_spot_rot:{

nombre:"Mancha bacteriana / pudrición bacteriana",

tipo:"Enfermedad bacteriana",

nivel:"Alto",

descripcion:
"Infección causada por bacterias que producen lesiones en tejidos vegetales y pueden avanzar rápidamente.",


sintomas:[
"Manchas húmedas o oscuras",
"Necrosis en hojas",
"Pudrición en tejidos afectados"
],


causas:
"Exceso de humedad, heridas en la planta y contaminación por herramientas.",


acciones:[
"Eliminar partes afectadas",
"Desinfectar herramientas",
"Evitar exceso de humedad"
],


prevencion:[
"Usar material vegetal sano y mantener higiene del cultivo."],

recomendacion:
    "Eliminar las partes infectadas, desinfectar las herramientas de trabajo y evitar el exceso de humedad para reducir el avance de la enfermedad."

},






hernia_col:{

nombre:"Hernia de la col",

tipo:"Enfermedad del sistema radicular",

nivel:"Alto",

descripcion:
"Enfermedad causada por un organismo del suelo que afecta las raíces de plantas de la familia de las coles.",


sintomas:[
"Raíces deformadas",
"Marchitez de la planta",
"Bajo crecimiento"
],


causas:
"Suelos contaminados y condiciones de humedad excesiva.",


acciones:[
"Retirar plantas afectadas",
"Evitar replantar en suelo contaminado",
"Mejorar drenaje"
],


prevencion:[
"Realizar rotación de cultivos y revisar condiciones del suelo."],

recomendacion:
    "Retirar las plantas afectadas, mejorar el drenaje del suelo y realizar rotación de cultivos para disminuir la presencia del patógeno."


},






mildiu_velloso:{

nombre:"Mildiu velloso",

tipo:"Enfermedad fúngica",

nivel:"Medio",

descripcion:
"Hongo que afecta principalmente hojas produciendo manchas y crecimiento algodonoso en condiciones húmedas.",


sintomas:[
"Manchas amarillas",
"Aspecto velloso debajo de hojas",
"Debilitamiento de la planta"
],


causas:
"Humedad alta, poca circulación de aire y temperaturas moderadas.",


acciones:[
"Reducir humedad",
"Mejorar ventilación",
"Eliminar hojas afectadas"
],


prevencion:[
"Evitar riegos sobre las hojas y mantener espacios adecuados."],

recomendacion:
    "Reducir la humedad, mejorar la circulación de aire entre las plantas y eliminar las hojas afectadas para limitar el desarrollo del hongo."


},





podredumbre_negra:{

nombre:"Podredumbre negra",

tipo:"Enfermedad bacteriana",

nivel:"Alto",

descripcion:
"Enfermedad que provoca lesiones oscuras y deterioro de tejidos vegetales.",


sintomas:[
"Manchas negras en hojas",
"Marchitez",
"Deterioro del cultivo"
],


causas:
"Presencia de bacterias favorecidas por humedad y heridas.",


acciones:[
"Eliminar partes enfermas",
"No reutilizar residuos infectados",
"Controlar humedad"
],


prevencion:[
"Utilizar semillas sanas y evitar contaminación cruzada."],

 recomendacion:
    "Eliminar las plantas o tejidos enfermos, evitar la contaminación entre cultivos y utilizar semillas o plántulas sanas."


},






pulgon:{

nombre:"Pulgón",

tipo:"Plaga insecto",

nivel:"Medio",

descripcion:
"Insecto pequeño que se alimenta de la savia de la planta debilitando su desarrollo.",


sintomas:[
"Hojas enrolladas",
"Presencia de pequeños insectos",
"Pegajosidad en hojas"
],


causas:
"Incremento de población de insectos por falta de control biológico.",


acciones:[
"Revisar envés de hojas",
"Retirar colonias pequeñas",
"Aplicar control autorizado"
],


prevencion:[
"Favorecer insectos benéficos y monitorear frecuentemente."],

recomendacion:
    "Realizar inspecciones frecuentes, retirar colonias pequeñas cuando sea posible y aplicar un método de control autorizado si la infestación aumenta."


},






ring_spot:{

nombre:"Mancha en anillo",

tipo:"Enfermedad foliar",

nivel:"Medio",

descripcion:
"Produce lesiones circulares en las hojas que pueden afectar el desarrollo de la planta.",


sintomas:[
"Manchas circulares",
"Anillos visibles en hojas",
"Necrosis localizada"
],


causas:
"Relacionada con agentes patógenos y condiciones ambientales favorables.",


acciones:[
"Retirar hojas afectadas",
"Evitar propagación entre plantas",
"Monitorear evolución"
],


prevencion:[
"Mantener limpieza del cultivo y evitar exceso de humedad."],

recomendacion:
    "Retirar las hojas con lesiones, evitar la propagación entre plantas y mantener el cultivo limpio y con buena ventilación."


}


};



return datos[clase] || {

nombre:clase,

tipo:"Desconocido",

nivel:"Sin determinar",

descripcion:
"No existe información suficiente para este diagnóstico.",

sintomas:[
"Sin datos disponibles"
],

causas:
"Se requiere análisis adicional.",

acciones:[
"Tomar una nueva fotografía",
"Consultar información adicional"
],

prevencion:
"Realizar seguimiento del cultivo.",

recomendacion:
"Consultar con un especialista o tomar una nueva fotografía."

};



}






export default Diagnostico;
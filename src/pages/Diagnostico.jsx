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







            await guardarDiagnostico({

    resultado:
        resultado.clase,

    confianza:
        resultado.confianza,

    descripcion:
        datos.descripcion,

    recomendacion:
        datos.recomendacion,

    imagen

});








            navigate(

                "/reporte",

                {

                    state:{


                        imagen,


                        resultado,


                        perfil:
                            usuario.perfil


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



const datos={



sana:{

nombre:
"Planta sana",

descripcion:
"No presenta síntomas visibles.",

recomendacion:
"Continuar cuidados normales."

},




trips:{

nombre:
"Trips",

descripcion:
"Plaga que afecta tejidos de hojas.",

recomendacion:
"Aplicar control autorizado."

},




pulgon:{

nombre:
"Pulgón",

descripcion:
"Insecto que consume savia.",

recomendacion:
"Realizar monitoreo y control."

},




alternaria:{

nombre:
"Alternaria",

descripcion:
"Enfermedad causada por hongos.",

recomendacion:
"Eliminar hojas afectadas."

},




mildiu_velloso:{

nombre:
"Mildiu velloso",

descripcion:
"Enfermedad por exceso de humedad.",

recomendacion:
"Mejorar ventilación."

},




podredumbre_blanca:{

nombre:
"Podredumbre blanca",

descripcion:
"Pudrición causada por hongos.",

recomendacion:
"Eliminar partes afectadas."

},




hernia_col:{

nombre:
"Hernia de la col",

descripcion:
"Afecta raíces del cultivo.",

recomendacion:
"Realizar rotación."

},




deficiencia_n:{

nombre:
"Deficiencia de nitrógeno",

descripcion:
"Bajo nivel de nitrógeno.",

recomendacion:
"Aplicar fertilizante adecuado."

},




deficiencia_p:{

nombre:
"Deficiencia de fósforo",

descripcion:
"Bajo nivel de fósforo.",

recomendacion:
"Aplicar fertilización fosfatada."

}



};





return datos[clase] || {


nombre:
clase,


descripcion:
"Sin información.",


recomendacion:
"Consultar especialista."


};



}






export default Diagnostico;
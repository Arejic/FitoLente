import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { generarPDF } from "../services/pdf";

import ReportePrimaria from "../components/ReportePrimaria";
import ReporteUniversidad from "../components/ReporteUniversidad";


function Reporte(){


    const navigate = useNavigate();
    const location = useLocation();

    const reporteRef = useRef(null);


    const state = location.state || {};



    const desdeHistorial =
        Boolean(state.reporte);



    const usuarioActual =
        JSON.parse(
            localStorage.getItem("usuario")
        );



    let imagen = null;
    let resultado = null;
    let usuario = null;
    let perfil = null;
    let fecha = null;



    // =========================
    // REPORTE NUEVO
    // =========================

    if(
        state.imagen &&
        state.resultado
    ){


        imagen =
            state.imagen;


        resultado =
            state.resultado;



        usuario =
            usuarioActual?.nombre ||
            "Usuario desconocido";



        perfil =
            usuarioActual?.perfil ||
            "Sin perfil";



        fecha =
            new Date().toISOString();


    }





    // =========================
    // REPORTE HISTORIAL
    // =========================

    if(state.reporte){


        resultado = {

            clase:
                state.reporte.resultado,


            confianza:
                Number(
                    state.reporte.confianza
                )

        };



        imagen =
            state.reporte.imagenURL ||
            null;



        usuario =
            state.reporte.usuario ||
            "Usuario desconocido";



        perfil =
            state.reporte.perfil ||
            usuarioActual?.perfil ||
            "Sin perfil";



        fecha =
            state.reporte.fecha ||
            new Date().toISOString();


    }







    useEffect(()=>{


        if(!resultado){

            navigate("/menu");

        }


    },[resultado,navigate]);








    if(!resultado){

        return null;

    }








    const perfilTexto =
        perfil
        ?.toString()
        .trim()
        .toLowerCase();





    const esPrimaria =
        perfilTexto === "estudiante" ||
        perfilTexto === "alumno";







    console.log(
        "Perfil recibido:",
        perfil
    );



    console.log(
        "Imagen reporte:",
        imagen
    );






    const info =
        obtenerInformacion(
            resultado.clase
        );







    const datosReporte = {


        nombre:
            info.nombre,


        descripcion:
            info.descripcion,


        recomendacion:
            info.recomendacion,


        confianza:
            resultado.confianza,


        usuario,


        perfil,


        imagen,


        fecha


    };







    function regresar(){


        if(desdeHistorial){


            navigate(
                "/prehistorial"
            );


        }else{


            navigate(
                "/carga"
            );


        }


    }








    return (


        <div className="pagina-reporte">



            <div ref={reporteRef}>


                {

                esPrimaria


                ?


                <ReportePrimaria

                    reporte={datosReporte}

                />


                :


                <ReporteUniversidad

                    reporte={datosReporte}

                />


                }



            </div>






            <div className="acciones">



                <button

                    className="btn"

                    onClick={
                        ()=>generarPDF(reporteRef)
                    }

                >

                    Descargar PDF


                </button>






                <button

                    className="btn"

                    onClick={regresar}

                >

                    Regresar


                </button>



            </div>





        </div>


    );


}









function obtenerInformacion(clase){



    const informacion = {



        sana:{


            nombre:
                "Planta sana",


            descripcion:
                "La planta no presenta síntomas visibles de enfermedades, plagas o deficiencias nutricionales.",


            recomendacion:
                "Continúe con los cuidados habituales y realice inspecciones periódicas."


        },





        trips:{


            nombre:
                "Trips",


            descripcion:
                "Plaga que afecta los tejidos de las hojas y reduce el desarrollo de la planta.",


            recomendacion:
                "Aplicar control biológico o tratamiento autorizado."


        },





        pulgon:{


            nombre:
                "Pulgón",


            descripcion:
                "Insecto chupador que debilita la planta al alimentarse de la savia.",


            recomendacion:
                "Realizar monitoreo y aplicar medidas de control."


        },





        alternaria:{


            nombre:
                "Alternaria",


            descripcion:
                "Enfermedad causada por hongos que produce manchas oscuras en las hojas.",


            recomendacion:
                "Retirar hojas afectadas y controlar humedad."


        },





        mildiu_velloso:{


            nombre:
                "Mildiu velloso",


            descripcion:
                "Enfermedad favorecida por humedad elevada y poca ventilación.",


            recomendacion:
                "Mejorar ventilación y aplicar fungicida autorizado."


        },





        podredumbre_blanca:{


            nombre:
                "Podredumbre blanca",


            descripcion:
                "Enfermedad causada por hongos que provoca pudrición de tejidos.",


            recomendacion:
                "Eliminar partes afectadas y reducir exceso de humedad."


        },





        hernia_col:{


            nombre:
                "Hernia de la col",


            descripcion:
                "Enfermedad que afecta principalmente las raíces del cultivo.",


            recomendacion:
                "Realizar rotación de cultivos y mejorar manejo del suelo."


        },





        deficiencia_n:{


            nombre:
                "Deficiencia de nitrógeno",


            descripcion:
                "La planta presenta baja disponibilidad de nitrógeno.",


            recomendacion:
                "Aplicar fertilización nitrogenada según necesidad."


        },





        deficiencia_p:{


            nombre:
                "Deficiencia de fósforo",


            descripcion:
                "La planta presenta deficiencia de fósforo.",


            recomendacion:
                "Aplicar fertilización fosfatada adecuada."


        }


    };






    return informacion[clase] || {


        nombre:
            clase,


        descripcion:
            "No existe información disponible para este diagnóstico.",


        recomendacion:
            "Consulte a un especialista."


    };


}





export default Reporte;
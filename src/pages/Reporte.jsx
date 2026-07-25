import {
    useRef,
    useEffect
} from "react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import { generarPDF } from "../services/pdf";

import "../assets/css/reporte.css";


function Reporte(){


    const navigate = useNavigate();

    const location = useLocation();

    const reporteRef = useRef(null);



    const state = location.state || {};
    const desdeHistorial = Boolean(state.reporte);



    let imagen = null;

    let resultado = null;



    // ==============================
    // REPORTE NUEVO
    // ==============================

    if(state.imagen && state.resultado){

        imagen = state.imagen;

        resultado = state.resultado;

    }



    // ==============================
    // REPORTE DESDE HISTORIAL
    // ==============================

    if(state.reporte){


        resultado = {

            clase:
            state.reporte.resultado,


            confianza:
            Number(state.reporte.confianza)

        };


        imagen =
        state.reporte.imagen || null;


    }





    useEffect(()=>{


        if(!resultado){

            navigate("/menu");

        }


    },[resultado]);





    if(!resultado){

        return null;

    }




    const info =
    obtenerInformacion(resultado.clase);





    const fecha =
    new Date();



    const fechaTexto =
    fecha.toLocaleDateString();



    const horaTexto =
    fecha.toLocaleTimeString();






    return (



        <div className="pagina-reporte">



            <div
                className="reporte"
                ref={reporteRef}
            >




                <div className="encabezado">


                    <h1>
                        FitoLente
                    </h1>


                    <h2>
                        Reporte de Diagnóstico Fitosanitario
                    </h2>


                </div>






                <div className="datos">


                    <div>

                        <strong>
                            Fecha:
                        </strong>

                        <br/>

                        {fechaTexto}

                    </div>





                    <div>

                        <strong>
                            Hora:
                        </strong>

                        <br/>

                        {horaTexto}

                    </div>





                    <div>

                        <strong>
                            Cultivo:
                        </strong>

                        <br/>

                        Col

                    </div>



                </div>








                {
                    imagen &&

                    <div className="imagen">


                        <img

                            src={imagen}

                            alt="Cultivo analizado"

                        />


                    </div>

                }









                <div className="seccion">


                    <h3>
                        Diagnóstico
                    </h3>


                    <p>

                        {info.nombre}

                    </p>


                </div>









                <div className="seccion">


                    <h3>
                        Confianza
                    </h3>





                    <div className="barra">


                        <div

                            className="progreso"

                            style={{

                                width:
                                `${Math.round(resultado.confianza)}%`

                            }}

                        >


                        </div>


                    </div>





                    <p>

                        {
                            Math.round(
                                resultado.confianza
                            )
                        } %

                    </p>



                </div>









                <div className="seccion">


                    <h3>
                        Descripción
                    </h3>


                    <p>

                        {info.descripcion}

                    </p>


                </div>









                <div className="seccion">


                    <h3>
                        Recomendaciones
                    </h3>


                    <p>

                        {info.recomendacion}

                    </p>


                </div>









                <div className="seccion">


                    <h3>
                        Observaciones
                    </h3>



                    <p>

                        Este diagnóstico fue generado automáticamente
                        mediante el modelo de Inteligencia Artificial
                        de FitoLente y debe utilizarse como apoyo
                        para la toma de decisiones.

                    </p>


                </div>








                <div className="pie">


                    Generado por FitoLente


                </div>





            </div>








            <div className="acciones">



                <button

                    className="btn"

                    onClick={()=>
                        generarPDF(reporteRef)
                    }

                >

                    Descargar PDF


                </button>








        <button

className="btn"

onClick={()=>{

    if(desdeHistorial){

        navigate("/menu");

    }else{

        navigate("/carga");

    }

}}

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

            nombre:"Planta sana",

            descripcion:
            "La planta no presenta síntomas visibles de enfermedades, plagas o deficiencias nutricionales.",

            recomendacion:
            "Continúe con los cuidados habituales y realice inspecciones periódicas."

        },



        trips:{

            nombre:"Trips",

            descripcion:
            "Plaga que afecta los tejidos de las hojas y reduce el desarrollo de la planta.",

            recomendacion:
            "Aplicar control biológico o tratamiento autorizado."

        },



        pulgon:{

            nombre:"Pulgón",

            descripcion:
            "Insecto chupador que debilita la planta al alimentarse de la savia.",

            recomendacion:
            "Realizar monitoreo y aplicar medidas de control."

        },



        alternaria:{

            nombre:"Alternaria",

            descripcion:
            "Enfermedad causada por hongos que produce manchas oscuras en las hojas.",

            recomendacion:
            "Retirar hojas afectadas y controlar humedad."

        },



        mildiu_velloso:{

            nombre:"Mildiu velloso",

            descripcion:
            "Enfermedad favorecida por humedad elevada y poca ventilación.",

            recomendacion:
            "Mejorar ventilación y aplicar fungicida autorizado."

        },



        podredumbre_blanca:{

            nombre:"Podredumbre blanca",

            descripcion:
            "Enfermedad causada por hongos que provoca pudrición de tejidos.",

            recomendacion:
            "Eliminar partes afectadas y reducir exceso de humedad."

        },



        hernia_col:{

            nombre:"Hernia de la col",

            descripcion:
            "Enfermedad que afecta principalmente las raíces del cultivo.",

            recomendacion:
            "Realizar rotación de cultivos y mejorar manejo del suelo."

        },



        deficiencia_n:{

            nombre:"Deficiencia de nitrógeno",

            descripcion:
            "La planta presenta baja disponibilidad de nitrógeno.",

            recomendacion:
            "Aplicar fertilización nitrogenada según necesidad."

        },



        deficiencia_p:{

            nombre:"Deficiencia de fósforo",

            descripcion:
            "La planta presenta deficiencia de fósforo.",

            recomendacion:
            "Aplicar fertilización fosfatada adecuada."

        }


    };




    return informacion[clase] || {


        nombre:clase,

        descripcion:
        "No existe información disponible para este diagnóstico.",

        recomendacion:
        "Consulte a un especialista."

    };


}



export default Reporte;
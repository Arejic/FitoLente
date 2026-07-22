import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generarPDF } from "../services/pdf";
import "../assets/css/reporte.css";

function Reporte() {

    const navigate = useNavigate();
    const location = useLocation();
    const reporteRef = useRef(null);

    const { imagen, resultado } = location.state || {};

    if (!resultado) {
        navigate("/menu");
        return null;
    }

    const info = obtenerInformacion(resultado.clase);

    const fecha = new Date();

    const fechaTexto = fecha.toLocaleDateString();

    const horaTexto = fecha.toLocaleTimeString();

    let riesgo = "Bajo";

    if (resultado.confianza >= 85) {

        riesgo = "Alto";

    } else if (resultado.confianza >= 60) {

        riesgo = "Medio";

    }

    return (

        <div className="pagina-reporte">

            <div
                className="reporte"
                ref={reporteRef}
            >

                <div className="encabezado">

                    <h1>FitoLente</h1>

                    <h2>
                        Reporte de Diagnóstico Fitosanitario
                    </h2>

                </div>

                <div className="datos">

                    <div>

                        <strong>Fecha:</strong>

                        <br />

                        {fechaTexto}

                    </div>

                    <div>

                        <strong>Hora:</strong>

                        <br />

                        {horaTexto}

                    </div>

                    <div>

                        <strong>Cultivo:</strong>

                        <br />

                        Col

                    </div>

                </div>

                <div className="imagen">

                    <img
                        src={imagen}
                        alt="Cultivo"
                    />

                </div>

                <div className="seccion">

                    <h3>Diagnóstico</h3>

                    <p>{info.nombre}</p>

                </div>

                <div className="seccion">

                    <h3>Confianza</h3>

                    <div className="barra">

                        <div
                            className="progreso"
                            style={{
                                width: `${Math.round(resultado.confianza)}%`
                            }}
                        ></div>

                    </div>

                    <p>

                        {Math.round(resultado.confianza)} %

                    </p>

                </div>

                <div className="seccion">

                    <h3>Descripción</h3>

                    <p>

                        {info.descripcion}

                    </p>

                </div>

                <div className="seccion">

                    <h3>Recomendaciones</h3>

                    <p>

                        {info.recomendacion}

                    </p>

                </div>

                <div className="seccion">

                    <h3>Observaciones</h3>

                    <p>

                        Este diagnóstico fue generado automáticamente mediante el modelo de Inteligencia Artificial de FitoLente y debe utilizarse como apoyo para la toma de decisiones.

                    </p>

                </div>

                <div className="pie">

                    Generado por FitoLente

                </div>

            </div>

            <div className="acciones">

                <button
                    className="btn"
                    onClick={() => generarPDF(reporteRef)}
                >

                    Descargar PDF

                </button>

                <button
                    className="btn"
                    onClick={() => navigate("/carga")}
                >

                    Regresar

                </button>

            </div>

        </div>

    );

}

function obtenerInformacion(clase) {

    const informacion = {

        sana: {

            nombre: "Planta sana",

            descripcion: "La planta no presenta síntomas visibles de enfermedades, plagas o deficiencias nutricionales.",

            recomendacion: "Continúe con los cuidados habituales y realice inspecciones periódicas."

        },

        trips: {

            nombre: "Trips",

            descripcion: "Plaga de pequeños insectos que dañan los tejidos de las hojas.",

            recomendacion: "Aplicar un tratamiento autorizado y monitorear el cultivo."

        },

        pulgon: {

            nombre: "Pulgón",

            descripcion: "Insecto chupador que debilita la planta.",

            recomendacion: "Realizar control biológico o químico autorizado."

        },

        alternaria: {

            nombre: "Alternaria",

            descripcion: "Enfermedad causada por hongos que produce manchas oscuras.",

            recomendacion: "Eliminar hojas enfermas y reducir la humedad."

        },

        mildiu_velloso: {

            nombre: "Mildiu velloso",

            descripcion: "Enfermedad favorecida por ambientes húmedos.",

            recomendacion: "Mejorar la ventilación y aplicar fungicida."

        },

        podredumbre_blanca: {

            nombre: "Podredumbre blanca",

            descripcion: "Provoca pudrición de los tejidos.",

            recomendacion: "Eliminar plantas infectadas."

        },

        hernia_col: {

            nombre: "Hernia de la col",

            descripcion: "Enfermedad que afecta las raíces.",

            recomendacion: "Rotación de cultivos."

        },

        deficiencia_n: {

            nombre: "Deficiencia de nitrógeno",

            descripcion: "Baja disponibilidad de nitrógeno.",

            recomendacion: "Aplicar fertilización nitrogenada."

        },

        deficiencia_p: {

            nombre: "Deficiencia de fósforo",

            descripcion: "Deficiencia de fósforo.",

            recomendacion: "Aplicar fertilización fosfatada."

        }

    };

    return informacion[clase];

}

export default Reporte;
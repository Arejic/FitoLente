import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { analizarImagen } from "../services/ia";

function Diagnostico() {

    const navigate = useNavigate();
    const location = useLocation();
    const imagenRef = useRef(null);

    const [imagen, setImagen] = useState(null);
    const [estado, setEstado] = useState("Preparando análisis...");
    const [resultado, setResultado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarSalir, setMostrarSalir] = useState(false);

    const info = resultado
        ? obtenerInformacion(resultado.clase)
        : null;

    useEffect(() => {

        if (!location.state?.archivo) {
            setEstado("No se recibió ninguna imagen");
            return;
        }

        const archivo = location.state.archivo;
        const url = URL.createObjectURL(archivo);

        setImagen(url);

        analizar(url);

    }, [location.state]);

    async function analizar(url) {

        try {

            setEstado("Cargando inteligencia artificial...");

            await new Promise(resolve => setTimeout(resolve, 500));

            setEstado("Analizando imagen...");

            const img = new Image();

            img.src = url;

            img.onload = async () => {

                try {

                    imagenRef.current = img;

                    const respuesta = await analizarImagen(img);

                    setResultado(respuesta);

setEstado("Análisis completado");

setResultado(respuesta);

setEstado("Análisis completado");

                } catch (error) {

                    console.error(error);

                    setEstado("Error al analizar imagen");

                }

            };

            img.onerror = () => {

                setEstado("No fue posible cargar la imagen.");

            };

        } catch (error) {

            console.error(error);

            setEstado("Error al analizar la imagen");

        }

    }

    function nuevaFoto() {

        navigate("/carga");

    }

    function generarReporte() {

        navigate("/reporte", {

            state: {

                imagen,
                resultado

            }

        });

    }

    return (

        <div className="mobile-container">

            <header className="header">

                <h1>FitoLente</h1>

            </header>

            <main className="content">

                {
                    imagen &&

                    <div className="image-rounded-container">

                        <img
                            src={imagen}
                            alt="Planta analizada"
                        />

                    </div>

                }

                <h2>{estado}</h2>

                {
                    resultado &&

                    <div className="resultado">

                        <h3>Diagnóstico</h3>

                        <p>🌱 {info.nombre}</p>

                        <h3>Descripción</h3>

                        <p>{info.descripcion}</p>

                        <h3>Confianza</h3>

                        <p>{Math.round(resultado.confianza)} %</p>

                        <h3>Recomendación</h3>

                        <p>{info.recomendacion}</p>

                    </div>

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
    onClick={() => setMostrarModal(true)}
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
    Si selecciona "Sí", se abrirá la pantalla para generar el reporte PDF.
    Si selecciona "No", regresará directamente al menú principal.
</p>

                       <div className="modal-botones">
<button
    className="btn"
    onClick={() => {

        setMostrarModal(false);
        navigate("/menu");

    }}
>
    No
</button>

    <button
        className="btn"
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

function obtenerInformacion(clase) {

    const informacion = {

        sana: {
            nombre: "Planta sana",
            descripcion: "La planta no presenta síntomas visibles de enfermedades, plagas o deficiencias nutricionales.",
            recomendacion: "Continúe con los cuidados habituales y realice inspecciones periódicas."
        },

        trips: {
            nombre: "Trips",
            descripcion: "Plaga de pequeños insectos que dañan los tejidos de las hojas y afectan el desarrollo de la planta.",
            recomendacion: "Revise las hojas afectadas y aplique un control biológico o un tratamiento autorizado."
        },

        pulgon: {
            nombre: "Pulgón",
            descripcion: "Insecto chupador que se alimenta de la savia y debilita la planta.",
            recomendacion: "Inspeccione los brotes nuevos y controle la población mediante métodos adecuados."
        },

        alternaria: {
            nombre: "Alternaria",
            descripcion: "Enfermedad causada por hongos que produce manchas oscuras y secas en las hojas.",
            recomendacion: "Retire las hojas afectadas y reduzca el exceso de humedad."
        },

        mildiu_velloso: {
            nombre: "Mildiu velloso",
            descripcion: "Enfermedad fúngica favorecida por ambientes húmedos y poca ventilación.",
            recomendacion: "Mejore la ventilación del cultivo y evite mantener las hojas húmedas."
        },

        podredumbre_blanca: {
            nombre: "Podredumbre blanca",
            descripcion: "Enfermedad que provoca pudrición de los tejidos y afecta el desarrollo del cultivo.",
            recomendacion: "Retire las plantas afectadas y evite la contaminación del suelo."
        },

        hernia_col: {
            nombre: "Hernia de la col",
            descripcion: "Enfermedad que afecta las raíces e impide una correcta absorción de agua y nutrientes.",
            recomendacion: "Revise el sistema radicular y considere la rotación de cultivos."
        },

        deficiencia_n: {
            nombre: "Deficiencia de nitrógeno",
            descripcion: "La planta presenta síntomas compatibles con una baja disponibilidad de nitrógeno.",
            recomendacion: "Revise el plan de fertilización y aplique nitrógeno cuando sea necesario."
        },

        deficiencia_p: {
            nombre: "Deficiencia de fósforo",
            descripcion: "La planta presenta síntomas compatibles con una deficiencia de fósforo.",
            recomendacion: "Verifique la disponibilidad de fósforo en el suelo y ajuste la fertilización."
        }

    };

    return informacion[clase] || {

        nombre: clase,
        descripcion: "No existe información disponible para este diagnóstico.",
        recomendacion: "Consulte a un especialista para confirmar el resultado."

    };

}

export default Diagnostico;
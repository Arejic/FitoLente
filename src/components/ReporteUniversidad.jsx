/*
 * Proyecto: FitoLente
 * Autores:
 * Josue Arturo Juarez Rangel
 * Areli Jimenez Contreras
 * Juan Manuel Valerio Astorga
 *
 * Universidad Tecnológica de Tula-Tepeji
 */
import "../assets/css/reporte.css";


function ReporteUniversidad({ reporte }) {


    const fecha =
        new Date(reporte.fecha);



    return (

        <div className="reporte">


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

                    {
                        fecha.toLocaleDateString()
                    }

                </div>



                <div>

                    <strong>
                        Hora:
                    </strong>

                    <br/>

                    {
                        fecha.toLocaleTimeString()
                    }

                </div>



                <div>

                    <strong>
                        Cultivo:
                    </strong>

                    <br/>

                    Col

                </div>


            </div>




            <div className="datos">


                <div>

                    <strong>
                        Generado por:
                    </strong>

                    <br/>

                    {
                        reporte.usuario
                    }

                </div>



                <div>

                    <strong>
                        Perfil:
                    </strong>

                    <br/>

                    {
                        reporte.perfil
                    }

                </div>


            </div>





            {
                reporte.imagen &&

                <div className="imagen">

                    <img
    src={reporte.imagen}
    alt="Cultivo"
    crossOrigin="anonymous"
/>

                </div>

            }






            <div className="seccion">


                <h3>
                    Diagnóstico
                </h3>


                <p>
                    🌱 {reporte.nombre}
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
                            `${Math.round(reporte.confianza)}%`
                        }}

                    />


                </div>


                <p>
                    {Math.round(reporte.confianza)} %
                </p>


            </div>





            <div className="seccion">


                <h3>
                    Descripción
                </h3>


                <p>
                    {reporte.descripcion}
                </p>


            </div>





            <div className="seccion">


                <h3>
                    Recomendaciones
                </h3>


                <p>
                    {reporte.recomendacion}
                </p>


            </div>





            <div className="seccion">


                <h3>
                    Observaciones
                </h3>


                <p>

                    Este diagnóstico fue generado automáticamente mediante el modelo de Inteligencia Artificial de FitoLente y debe utilizarse como apoyo para la toma de decisiones.

                </p>


            </div>




            <div className="pie">

                Generado por FitoLente

            </div>


        </div>

    );

}


export default ReporteUniversidad;
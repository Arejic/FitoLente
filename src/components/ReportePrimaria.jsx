/*
 * Proyecto: FitoLente
 * Autores:
 * Josue Arturo Juarez Rangel
 * Areli Jimenez Contreras
 * Juan Manuel Valerio Astorga
 *
 * Universidad Tecnológica de Tula-Tepeji
 */
import "../assets/css/reportePrimaria.css";


function ReportePrimaria({ reporte }) {


    return (

        <div className="reporte-primaria">


            <header className="header-primaria">

                <h1>
                    FitoLente
                </h1>


                <p>
                    Reporte del Huerto Escolar
                </p>


            </header>





            <div className="datos-primaria">


                <div>

                    Fecha

                    <strong>

                        {
                            new Date(
                                reporte.fecha
                            ).toLocaleDateString()
                        }

                    </strong>

                </div>




                <div>

                    Cultivo

                    <strong>
                        Col
                    </strong>

                </div>


            </div>





            {
                reporte.imagen &&


                <div className="imagen-primaria">


                    <img
    src={reporte.imagen}
    alt="Cultivo"
    crossOrigin="anonymous"
/>


                </div>

            }







            <section>


                <label>
                    ¿Qué encontró FitoLente?
                </label>


                <h2>
                    🌱 {reporte.nombre}
                </h2>


            </section>






            <section>


                <label>
                    ¿Qué significa?
                </label>


                <p>
                    {reporte.descripcion}
                </p>


            </section>






            <section>


                <label>
                    Nivel de confianza
                </label>


                <div className="barra-primaria">


                    <div

                        className="progreso-primaria"

                        style={{

                            width:
                            `${Math.round(reporte.confianza)}%`

                        }}

                    />


                </div>


                <p>
                    {Math.round(reporte.confianza)}%
                </p>


            </section>








            <section className="recomendacion-primaria">


                <label>
                    ¿Qué podemos hacer?
                </label>


                <p>
                    {reporte.recomendacion}
                </p>
            </section>

    





            <div className="aviso-primaria">


                💡 Este reporte sirve como apoyo para las actividades del huerto escolar.


                <br/><br/>


                Si la planta continúa presentando síntomas, es recomendable volver a revisarla o consultar a un especialista.


            </div>







            <footer className="footer-primaria">

                Generado por FitoLente

            </footer>



        </div>

    );

}


export default ReportePrimaria;
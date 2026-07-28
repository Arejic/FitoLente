import "../assets/css/diagnosticoUniversidad.css";


function DiagnosticoUniversidad({
    imagen,
    estado,
    info,
    resultado
}) {


    return (

        <div className="reporte-universidad">


            {
                imagen &&

                <div className="imagen-universidad">

                    <img
                        src={imagen}
                        alt="Cultivo"
                    />

                </div>

            }


            {
                resultado &&

                <>


                    <section className="bloque-universidad">

                        <label>
                            Diagnóstico encontrado
                        </label>

                        <h2>
                            🌱 {info?.nombre}
                        </h2>

                    </section>




                    <section className="bloque-universidad">

                        <label>
                            Nivel de confianza
                        </label>


                        <div className="barra-universidad">

                            <div
                                className="progreso-universidad"
                                style={{
                                    width:
                                    `${Math.round(resultado.confianza)}%`
                                }}
                            />

                        </div>


                        <p>
                            {Math.round(resultado.confianza)}%
                        </p>


                    </section>





                    <section className="bloque-universidad">

                        <label>
                            Descripción
                        </label>


                        <p>
                            {info?.descripcion}
                        </p>

                    </section>





                    <section className="bloque-universidad">

                        <label>
                            Recomendaciones
                        </label>


                        <p>
                            {info?.recomendacion}
                        </p>

                    </section>





                    <section className="bloque-universidad">

                        <label>
                            Observaciones
                        </label>
                        <p>
                            <br/>

                            Se recomienda validar el resultado mediante
                            observación directa de la planta y considerar
                            otros factores como clima, manejo del cultivo
                            y condiciones del suelo.

                        </p>

                    </section>



                </>

            }



            <div className="aviso-universidad">


                💡 Este diagnóstico fue generado mediante
                Inteligencia Artificial como apoyo para
                el análisis fitosanitario.


            </div>


        </div>

    );


}


export default DiagnosticoUniversidad;
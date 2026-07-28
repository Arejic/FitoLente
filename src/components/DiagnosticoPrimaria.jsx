import "../assets/css/diagnosticoPrimaria.css";


function DiagnosticoPrimaria({

    imagen,
    estado,
    info,
    resultado

}) {


    return (

        <div className="diagnostico-primaria">



            {

                imagen &&


                <div className="imagen-primaria">


                    <img

                        src={imagen}

                        alt="Cultivo"

                    />


                </div>


            }







            <section className="seccion-primaria">


                <label>
                    Estado del análisis
                </label>


                <h2>
                    {estado}
                </h2>


            </section>









            {

                resultado &&


                <>


                    <section className="seccion-primaria">


                        <label>
                            ¿Qué encontró FitoLente?
                        </label>



                        <h2>

                            🌱 {

                                info?.nombre ||
                                resultado.clase

                            }

                        </h2>



                    </section>









                    <section className="seccion-primaria">


                        <label>
                            ¿Qué significa?
                        </label>



                        <p>

                            {

                                info?.descripcion ||
                                "Sin información disponible."

                            }

                        </p>



                    </section>









                    <section className="seccion-primaria">


                        <label>
                            Nivel de confianza
                        </label>




                        <div className="barra-primaria">


                            <div

                                className="progreso-primaria"

                                style={{

                                    width:
                                    `${Math.round(resultado.confianza)}%`

                                }}

                            />


                        </div>




                        <p>

                            {
                                Math.round(
                                    resultado.confianza
                                )
                            }

                            %

                        </p>



                    </section>









                    <section className="accion-primaria">


                        <label>
                            ¿Qué podemos hacer?
                        </label>


                        <p>

                            {

                                info?.recomendacion ||
                                "Consultar con un especialista."

                            }

                        </p>


                    </section>









                    <div className="aviso-primaria">


                        💡 Este diagnóstico sirve como apoyo
                        para las actividades del huerto escolar.



                        <br/>
                        <br/>



                        Si la planta continúa presentando síntomas,
                        es recomendable revisarla nuevamente o
                        consultar a un especialista.


                    </div>





                </>


            }




        </div>


    );


}



export default DiagnosticoPrimaria;
import "../assets/css/reportePrimaria.css";


function ReportePrimaria({reporte}){


    return (

        <div className="pagina-reporte">


            <div className="reporte-primaria">


                <header>

                    <h1>
                        FitoLente
                    </h1>


                    <p>
                        Reporte de tu huerto
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






                <section>


                    <label>
                        ¿Qué le pasa a tu planta?
                    </label>


                    <h2>

                        Tu col tiene:

                        <br/>

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
                        ¿Qué hacer?
                    </label>


                    <p>

                        {reporte.recomendacion}

                    </p>


                </section>







                <div className="aviso-primaria">


                    💡 Este resultado es una ayuda.
                    Pide apoyo a un adulto si la planta continúa mal.


                </div>







                <footer>

                    Generado por FitoLente

                </footer>



            </div>


        </div>

    );


}


export default ReportePrimaria;
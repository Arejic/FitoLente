import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Prehistorial(){


    const navigate = useNavigate();


    const [fechaFiltro,setFechaFiltro] = useState("");

    const [busqueda,setBusqueda] = useState("");



    const regresar = () => {

        navigate("/menu");

    };



    const historial = [

        {
            fecha:"10/07/2029",
            diagnostico:"Diagnóstico"
        },

    ];




    const filtrados = historial.filter(item=>{


        return (

            item.fecha.includes(fechaFiltro)

            ||

            item.diagnostico
            .toLowerCase()
            .includes(busqueda.toLowerCase())

        );


    });





    return (

        <div className="mobile-container">



            <header className="header">

                <h1>
                    FitoLente
                </h1>

            </header>





            <main className="content">





                {/* BUSCADOR */}

                <div className="search-row">



                    <div className="search-box">


                        <button className="btn-buscar">

                            Buscar

                        </button>



                        <input

                            type="text"

                            className="input-buscar"

                            value={busqueda}

                            onChange={
                                e=>setBusqueda(e.target.value)
                            }

                        />


                    </div>





                    {/* CALENDARIO */}


                    <label className="btn-calendar">


                        📅


                        <input

                            type="date"

                            value={fechaFiltro}

                            onChange={
                                e=>setFechaFiltro(e.target.value)
                            }

                        />


                    </label>



                </div>







                {/* HISTORIAL */}



                <div className="history-list">



                    {

                    filtrados.map((item,index)=>(



                        <div

                            className="history-card"

                            key={index}

                        >




                            <div className="history-info">



                                <span className="icon-documento">

                                    📋

                                </span>



                                <span className="history-title">


                                    {item.diagnostico}

                                    {item.fecha}


                                </span>



                            </div>






                            <button

                                className="btn-download"

                                title="Descargar reporte"

                            >


                                ↓


                            </button>




                        </div>



                    ))

                    }



                </div>







                <div className="footer-controls">


                    <button

                        className="btn-regresar"

                        onClick={regresar}

                    >

                        Regresar


                    </button>


                </div>





            </main>





            <div className="footer-bar"></div>



        </div>


    );


}


export default Prehistorial;
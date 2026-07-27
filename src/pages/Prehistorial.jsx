import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    obtenerDiagnosticosPerfil
} from "../services/firestore";


function Prehistorial() {


    const navigate = useNavigate();


    const [fechaFiltro, setFechaFiltro] =
        useState("");


    const [busqueda, setBusqueda] =
        useState("");


    const [historial, setHistorial] =
        useState([]);



    useEffect(() => {


        async function cargarHistorial() {


            try {


                const usuario =
                    JSON.parse(
                        localStorage.getItem("usuario")
                    );



                if (!usuario) {

                    console.error(
                        "No existe usuario en localStorage"
                    );

                    return;

                }



                const datos =
                    await obtenerDiagnosticosPerfil(
                        usuario.perfil
                    );



                setHistorial(datos);



            } catch (error) {


                console.error(
                    "Error cargando historial:",
                    error
                );


            }


        }



        cargarHistorial();


    }, []);






    function regresar() {


        navigate("/menu");


    }







    function abrirReporte(item) {


        navigate("/reporte", {


            state: {

                reporte: item

            }


        });


    }







    function descargarReporte(item) {


        navigate("/reporte", {


            state: {

                reporte: item,

                descargar: true

            }


        });


    }








    const filtrados = historial.filter(item => {


        const texto =
            busqueda.toLowerCase();



        const diagnostico =
            (
                item.resultado || ""
            )
            .toLowerCase();



        const coincideBusqueda =
            diagnostico.includes(texto);



        const coincideFecha =
            fechaFiltro === ""
            ||
            (
                item.fecha || ""
            )
            .startsWith(fechaFiltro);



        return (
            coincideBusqueda
            &&
            coincideFecha
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



                <div className="search-row">



                    <div className="search-box">


                        <button
                            className="btn-buscar"
                        >

                            Buscar

                        </button>



                        <input

                            type="text"

                            className="input-buscar"

                            value={busqueda}

                            onChange={
                                e =>
                                    setBusqueda(
                                        e.target.value
                                    )
                            }

                        />


                    </div>





                    <label className="btn-calendar">


                        📅



                        <input

                            type="date"

                            value={fechaFiltro}

                            onChange={
                                e =>
                                    setFechaFiltro(
                                        e.target.value
                                    )
                            }

                        />


                    </label>



                </div>








                <div className="history-list">



                    {

                        filtrados.length === 0


                        ?


                        <p>
                            No hay reportes.
                        </p>



                        :



                        filtrados.map(
                            (item,index)=>(



                            <div


                                className="history-card"


                                key={
                                    item.id || index
                                }



                                onDoubleClick={
                                    () =>
                                    abrirReporte(item)
                                }


                            >



                                <div className="history-info">


                                    <span className="icon-documento">

                                        📋

                                    </span>





                                    <span className="history-title">



                                        <strong>

                                            {
                                                item.resultado
                                            }

                                        </strong>



                                        <br/>



                                        Confianza:

                                        {" "}



                                        {
                                            Math.round(
                                                item.confianza
                                            )
                                        }%



                                        <br/>



                                        {
                                            item.fecha &&
                                            new Date(
                                                item.fecha
                                            )
                                            .toLocaleString()
                                        }



                                    </span>



                                </div>






                                <button


                                    className="btn-download"



                                    title="Descargar reporte"



                                    onClick={
                                        (e)=>{


                                            e.stopPropagation();


                                            descargarReporte(item);


                                        }

                                    }


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
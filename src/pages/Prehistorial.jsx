import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";


import {
    obtenerDiagnosticosUsuario
} from "../services/firestore";


import {
    obtenerUsuario
} from "../services/sesion";



function Prehistorial(){


    const navigate = useNavigate();



    const [fechaFiltro,setFechaFiltro] =
        useState("");



    const [busqueda,setBusqueda] =
        useState("");



    const [historial,setHistorial] =
        useState([]);



    const [perfil,setPerfil] =
        useState("");





    useEffect(()=>{


        async function cargarHistorial(){


            try{


                const usuario =
                    obtenerUsuario();



                console.log(
                    "Usuario sesión historial:",
                    usuario
                );



                if(!usuario){


                    console.error(
                        "No existe usuario"
                    );


                    navigate("/");


                    return;


                }





                setPerfil(
                    usuario.perfil?.toLowerCase() || ""
                );





                const identificador = {


                    uid:
                    usuario.uid,


                    id:
                    usuario.id


                };





                console.log(
                    "Buscando diagnósticos:",
                    identificador
                );





                const datos =
                    await obtenerDiagnosticosUsuario(
                        identificador
                    );





                console.log(
                    "Diagnósticos recibidos:",
                    datos
                );





                setHistorial(
                    datos || []
                );




            }catch(error){


                console.error(
                    "Error cargando historial:",
                    error
                );


            }



        }




        cargarHistorial();



    },[navigate]);







    function regresar(){


        navigate("/menu");


    }







    function abrirReporte(item){


        navigate(
            "/reporte",
            {

                state:{

                    reporte:item

                }

            }

        );


    }







    function descargarReporte(item){


        navigate(
            "/reporte",
            {

                state:{

                    reporte:item,

                    descargar:true

                }

            }

        );


    }







    const filtrados = historial.filter(item=>{


        const texto =
            busqueda.toLowerCase();



        const diagnostico =
            (
                item.resultado || ""
            )
            .toLowerCase();




        const coincideBusqueda =
            diagnostico.includes(texto);




        let coincideFecha = true;




        if(fechaFiltro !== ""){


            if(!item.fecha){


                coincideFecha = false;


            }else{


                const fecha =
                    new Date(
                        item.fecha
                    );



                const fechaLocal =
                    `${fecha.getFullYear()}-${
                    String(
                        fecha.getMonth()+1
                    )
                    .padStart(2,"0")}-${
                    String(
                        fecha.getDate()
                    )
                    .padStart(2,"0")}`;



                coincideFecha =
                    fechaLocal === fechaFiltro;



            }


        }





        return (
            coincideBusqueda &&
            coincideFecha
        );


    });







    return(


        <div className="mobile-container">



            <header className="header">


                <h1>
                    FitoLente
                </h1>


                <p>
                    Historial de diagnósticos
                </p>


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

                            placeholder="Buscar diagnóstico"

                            value={busqueda}

                            onChange={
                                e=>
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
                                e=>
                                setFechaFiltro(
                                    e.target.value
                                )
                            }

                        />


                    </label>



                </div>








                <div className="history-list">



                {


                filtrados.length===0 ?


                (

                    <p>
                        No hay reportes.
                    </p>

                )


                :



                filtrados.map(
                    (item,index)=>(


                    <div

                        key={
                            item.id || index
                        }


                        className={

                            perfil==="estudiante"

                            ?

                            "history-card primaria-card"

                            :

                            "history-card universidad-card"

                        }


                        onDoubleClick={
                            ()=>abrirReporte(item)
                        }


                    >





                        <div className="history-info">


                            <span className="icon-documento">

                                📋

                            </span>




                            <span className="history-title">


                                <strong>

                                    {
                                        item.resultado ||
                                        "Sin diagnóstico"
                                    }

                                </strong>



                                <br/>


                                Confianza:


                                {" "}



                                {
                                    item.confianza
                                    ?

                                    Math.round(
                                        item.confianza * 100
                                    )

                                    :

                                    0

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
                                e=>{

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
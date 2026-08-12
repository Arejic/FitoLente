/*
 * Proyecto: FitoLente
 * Autores:
 * Josue Arturo Juarez Rangel
 * Areli Jimenez Contreras
 * Juan Manuel Valerio Astorga
 *
 * Universidad Tecnológica de Tula-Tepeji
 */
import {
    useEffect,
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";


import {
    obtenerDiagnosticosAPI,
    eliminarDiagnosticoAPI
} from "../services/api";


import {
    obtenerUsuario
} from "../services/sesion";


import {
    FiDownload,
    FiTrash2
} from "react-icons/fi";





function Prehistorial(){


    const navigate =
        useNavigate();




    const [fechaFiltro,setFechaFiltro] =
        useState("");



    const [busqueda,setBusqueda] =
        useState("");



    const [historial,setHistorial] =
        useState([]);



    const [perfil,setPerfil] =
        useState("");








    useEffect(()=>{


        async function cargar(){


            try{



                const usuario =
                    obtenerUsuario();





                console.log(
                    "Usuario historial:",
                    usuario
                );





                if(!usuario){


                    navigate("/");


                    return;


                }






                setPerfil(

                    usuario.perfil
                    ?.toString()
                    .toLowerCase()
                    ||
                    ""

                );








                const todos =
                    await obtenerDiagnosticosAPI();







                const identificadorUsuario =

                    usuario.uid ||
                    usuario.id;







                const datos =

                    todos.filter(

                        item =>

                        item.usuarioId === identificadorUsuario

                    );







                console.log(
                    "Todos:",
                    todos
                );



                console.log(
                    "Usuario buscado:",
                    identificadorUsuario
                );



                console.log(
                    "Historial filtrado:",
                    datos
                );







                setHistorial(
                    datos
                );





            }
            catch(error){


                console.error(

                    "Error cargando historial",

                    error

                );


            }



        }





        cargar();




    },[navigate]);













    async function eliminarReporte(item){


        const confirmar =

            window.confirm(

                "¿Desea eliminar este reporte?"

            );




        if(!confirmar){

            return;

        }







        try{



            await eliminarDiagnosticoAPI(

                item.id

            );







            setHistorial(

                lista =>

                lista.filter(

                    reporte =>

                    reporte.id !== item.id

                )

            );





        }
        catch(error){



            console.error(

                "Error eliminando reporte:",

                error

            );



            alert(

                "No se pudo eliminar el reporte"

            );



        }



    }









    function regresar(){


        navigate(
            "/menu"
        );


    }









    function abrirReporte(item){


        navigate(

            "/reporte",

            {

                state:{


                    origen:

                    "prehistorial",



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


                    origen:

                    "prehistorial",



                    reporte:item,


                    descargar:true


                }


            }


        );


    }









    const filtrados =


    historial.filter(item=>{






        const texto =

            busqueda

            .toLowerCase();







        const diagnostico =

            (

                item.resultado ||

                ""

            )

            .toLowerCase();







        const coincideBusqueda =


            diagnostico.includes(texto);









        let coincideFecha = true;







        if(fechaFiltro){



            if(item.fecha){



                const fecha =

                    new Date(

                        item.fecha

                    );






                const fechaTexto =

                `${fecha.getFullYear()}-${
                    String(
                        fecha.getMonth()+1
                    )
                    .padStart(2,"0")
                }-${
                    String(
                        fecha.getDate()
                    )
                    .padStart(2,"0")
                }`;







                coincideFecha =

                    fechaTexto === fechaFiltro;



            }
            else{


                coincideFecha=false;


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



                        <input


                            type="text"


                            className="input-buscar"


                            placeholder="Buscar diagnóstico"



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


                        key={

                            item.id ||

                            index

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

                                    Number(

                                        item.confianza

                                    )

                                    *

                                    100

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









                        <div className="acciones-historial">



                            <button


                                className="btn-download"


                                title="Abrir reporte"



                                onClick={

                                    (e)=>{


                                        e.stopPropagation();


                                        descargarReporte(item);


                                    }

                                }



                            >


                                <FiDownload />



                            </button>







                            <button


                                className="btn-delete"


                                title="Eliminar reporte"



                                onClick={

                                    (e)=>{


                                        e.stopPropagation();


                                        eliminarReporte(item);


                                    }

                                }



                            >


                                <FiTrash2 />



                            </button>






                        </div>







                    </div>




                    )


                )



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
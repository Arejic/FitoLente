import {
    useNavigate
} from "react-router-dom";


function MenuU(){


    const navigate = useNavigate();



    const usuario =
        JSON.parse(
            localStorage.getItem("usuario")
        );





    if(!usuario){


        navigate("/");


        return null;


    }






    function cambiarUsuario(){


        localStorage.removeItem(
            "usuario"
        );


        navigate("/");


    }







    return(



        <div className="mobile-container">






            <header className="header">


                <h1>

                    FitoLente

                </h1>


                <p>

                    Usuario:
                    {" "}
                    {usuario.nombre}

                </p>


                <p>

                    Perfil:
                    {" "}
                    {usuario.perfil}

                </p>



            </header>









            <main className="content">





                <button

                    className="btn btn-user-center"

                    onClick={cambiarUsuario}

                >

                    Cambiar usuario

                </button>









                <div className="image-circle">


                    <img

                        src="/src/assets/img/col.png"

                        alt="Planta"

                    />


                </div>









                <div className="button-row">





                    <button

                        className="btn"

                        onClick={
                            () =>
                            navigate("/carga")
                        }

                    >

                        Cámara


                    </button>







                    <button

                        className="btn"

                        onClick={
                            () =>
                            navigate("/prehistorial")
                        }

                    >

                        Historial


                    </button>







                </div>







            </main>







            <div className="footer-bar"></div>






        </div>



    );


}





export default MenuU;
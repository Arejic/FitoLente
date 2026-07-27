import {
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";


import {
    buscarUsuario
} from "../services/firestore";



function Login(){


    const navigate =
        useNavigate();



    const [nombre,setNombre] =
        useState("");



    const [password,setPassword] =
        useState("");



    const [perfil,setPerfil] =
        useState("estudiante");






    async function ingresar(){


        if(
            nombre === "" ||
            password === ""
        ){

            alert(
                "Complete todos los campos"
            );

            return;

        }




        try{


            const usuario =
                await buscarUsuario(

                    nombre,

                    password,

                    perfil

                );




            if(!usuario){


                alert(
                    "Usuario o contraseña incorrectos"
                );


                return;

            }






            localStorage.setItem(

                "usuario",

                JSON.stringify(usuario)

            );





            navigate("/menu");



        }catch(error){


            console.error(
                "Error iniciando sesión:",
                error
            );


            alert(
                "Error conectando con Firestore"
            );


        }



    }







    return(


        <div className="mobile-container">


            <main className="content">



                <h1>

                    FitoLente

                </h1>



                <h2>

                    Inicio de sesión

                </h2>






                <input

                    type="text"

                    placeholder="Nombre"

                    value={nombre}

                    onChange={
                        e =>
                        setNombre(
                            e.target.value
                        )
                    }

                />






                <input

                    type="password"

                    placeholder="Contraseña"

                    value={password}

                    onChange={
                        e =>
                        setPassword(
                            e.target.value
                        )
                    }

                />







                <select

                    value={perfil}

                    onChange={
                        e =>
                        setPerfil(
                            e.target.value
                        )
                    }

                >


                    <option value="estudiante">

                        Estudiante

                    </option>



                    <option value="universidad">

                        Universidad

                    </option>



                </select>








                <button

                    className="btn"

                    onClick={ingresar}

                >

                    Ingresar


                </button>








                <button

                    className="btn"

                    onClick={
                        () =>
                        navigate("/registro")
                    }

                >

                    Crear cuenta


                </button>






            </main>


        </div>


    );


}



export default Login;
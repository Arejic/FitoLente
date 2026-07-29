import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    registrarUsuario
} from "../services/firestore";


function Registro(){


    const navigate =
        useNavigate();



    const [nombre,setNombre] =
        useState("");


    const [password,setPassword] =
        useState("");


    const [perfil,setPerfil] =
        useState("estudiante");



    async function crearCuenta(){


        if(
            nombre.trim()==="" ||
            password.trim()===""
        ){

            alert(
                "Complete todos los campos."
            );

            return;

        }


        try{


            await registrarUsuario({

                nombre,

                password,

                perfil

            });


            alert(
                "Cuenta creada correctamente."
            );


            navigate("/");


        }catch(error){


            console.error(error);


            alert(
                "No fue posible crear la cuenta."
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

                    Crear cuenta

                </h2>



                <input

                    type="text"

                    placeholder="Nombre"

                    value={nombre}

                    onChange={
                        e=>
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
                        e=>
                        setPassword(
                            e.target.value
                        )
                    }

                />



                <select

                    value={perfil}

                    onChange={
                        e=>
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

                    onClick={crearCuenta}

                >

                    Crear cuenta

                </button>



                <button

                    className="btn"

                    onClick={
                        ()=>navigate("/")
                    }

                >

                    Regresar

                </button>


            </main>


            <div className="footer-bar"></div>


        </div>


    );


}


export default Registro;
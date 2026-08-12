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
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    registrarUsuario
} from "../services/auth";


function Registro(){


    const navigate = useNavigate();



    const [nombre,setNombre] =
        useState("");


    const [correo,setCorreo] =
        useState("");


    const [password,setPassword] =
        useState("");


    const [perfil,setPerfil] =
        useState("estudiante");



    async function crearCuenta(){


        const nombreLimpio =
            nombre.trim();


        const correoLimpio =
            correo.trim().toLowerCase();



        if(
            nombreLimpio === "" ||
            correoLimpio === "" ||
            password.trim() === ""
        ){

            alert(
                "Complete todos los campos."
            );

            return;

        }



        if(
            !correoLimpio.includes("@") ||
            !correoLimpio.includes(".")
        ){

            alert(
                "Ingrese un correo válido."
            );

            return;

        }



        if(password.length < 6){

            alert(
                "La contraseña debe tener mínimo 6 caracteres."
            );

            return;

        }



        try{


            console.log(
                "Correo enviado a Firebase:",
                correoLimpio
            );



           await registrarUsuario(

    correoLimpio,

    password,

    {

        nombre: nombreLimpio,

        perfil: perfil

    }

);



            alert(
                "Cuenta creada correctamente."
            );



            navigate("/");


        }catch(error){


            console.error(
                "Error registro:",
                error
            );



            if(error.code === "auth/email-already-in-use"){

                alert(
                    "Este correo ya está registrado."
                );

            }
            else if(error.code === "auth/invalid-email"){

                alert(
                    "El correo no es válido."
                );

            }
            else{

                alert(
                    error.message
                );

            }


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
                        e =>
                        setNombre(
                            e.target.value
                        )
                    }

                />



                <input

                    type="email"

                    placeholder="Correo electrónico"

                    value={correo}

                    onChange={
                        e =>
                        setCorreo(
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

                    onClick={crearCuenta}

                >

                    Crear cuenta

                </button>




                <button

                    className="btn"

                    onClick={
                        () => navigate("/")
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
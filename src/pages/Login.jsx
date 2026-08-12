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
    useState,
    useEffect
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    iniciarSesion,
    obtenerPerfil,
    cerrarSesion
} from "../services/auth";

function Login(){

    const navigate =
        useNavigate();

    useEffect(()=>{

        async function limpiarSesion(){

            try{

                await cerrarSesion();

            }
            catch(error){

                console.log(
                    "No había sesión activa"
                );

            }

            sessionStorage.clear();

        }

        limpiarSesion();

    },[]);

    const [correo,setCorreo] =
        useState("");

    const [password,setPassword] =
        useState("");

    const [perfil,setPerfil] =
        useState("estudiante");

    async function ingresar(){

        const correoLimpio =
            correo
            .trim()
            .toLowerCase();

        if(
            correoLimpio === "" ||
            password.trim() === ""
        ){

            alert(
                "Complete todos los campos"
            );

            return;

        }

        if(
            !correoLimpio.includes("@")
        ){

            alert(
                "Ingrese un correo válido"
            );

            return;

        }

        try{

            const usuarioAuth =
                await iniciarSesion(
                    correoLimpio,
                    password
                );

            // ==========================
            // NUEVOS LOGS
            // ==========================

            console.log(
                "Usuario autenticado:",
                usuarioAuth
            );

            console.log(
                "UID Firebase:",
                usuarioAuth.uid
            );

            const perfilUsuario =
                await obtenerPerfil(
                    usuarioAuth.uid
                );

            console.log(
                "Perfil recibido:",
                perfilUsuario
            );

            if(!perfilUsuario){

                alert(
                    "No existe información del usuario"
                );

                return;

            }

            if(
                perfilUsuario.perfil
                .toLowerCase()
                !==
                perfil.toLowerCase()
            ){

                alert(
                    "El perfil seleccionado no coincide"
                );

                return;

            }

            const usuario = {

                id:
                perfilUsuario.id,

                uid:
                usuarioAuth.uid,

                nombre:
                perfilUsuario.nombre,

                perfil:
                perfilUsuario.perfil,

                email:
                perfilUsuario.email

            };

            console.log(
                "Usuario guardado:",
                usuario
            );

            sessionStorage.clear();

            sessionStorage.setItem(
                "usuario",
                JSON.stringify(usuario)
            );

            navigate("/menu");

        }
        catch(error){

            console.error(
                "Error login:",
                error
            );

            alert(
                "Correo o contraseña incorrectos"
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
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={
                        e=>
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
                    onClick={ingresar}
                >
                    Ingresar
                </button>

                <button
                    className="btn"
                    onClick={
                        ()=>navigate("/registro")
                    }
                >
                    Crear cuenta
                </button>

            </main>

        </div>

    );

}

export default Login;
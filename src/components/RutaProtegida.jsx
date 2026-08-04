import { Navigate, Outlet } from "react-router-dom";
import { estaAutenticado } from "../services/sesion";


export default function RutaProtegida(){

    console.log(
        "¿Autenticado?",
        estaAutenticado()
    );


    if(!estaAutenticado()){

        console.log("Bloqueado, enviando a login");

        return (
            <Navigate 
                to="/" 
                replace
            />
        );

    }


    console.log("Usuario permitido");

    return <Outlet />;

}
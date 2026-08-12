/*
 * Proyecto: FitoLente
 * Autores:
 * Josue Arturo Juarez Rangel
 * Areli Jimenez Contreras
 * Juan Manuel Valerio Astorga
 *
 * Universidad Tecnológica de Tula-Tepeji
 */
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
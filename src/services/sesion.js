/*
 * Proyecto: FitoLente
 * Autores:
 * Josue Arturo Juarez Rangel
 * Areli Jimenez Contreras
 * Juan Manuel Valerio Astorga
 *
 * Universidad Tecnológica de Tula-Tepeji
 */
export function obtenerUsuario(){

    const usuario =
        sessionStorage.getItem("usuario");


    if(!usuario){
        return null;
    }


    return JSON.parse(usuario);

}


export function obtenerUsuarioId(){

    const usuario = obtenerUsuario();

    return usuario?.id || null;

}


export function obtenerPerfil(){

    const usuario = obtenerUsuario();

    return usuario?.perfil || null;

}


export function estaAutenticado(){

    return obtenerUsuario() !== null;

}


export function cerrarSesion(){

    sessionStorage.removeItem("usuario");

}
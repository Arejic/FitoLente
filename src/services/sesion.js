export function obtenerUsuario(){

    return JSON.parse(
        localStorage.getItem("usuario")
    );

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

    localStorage.removeItem("usuario");

}
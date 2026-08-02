import {
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";


import {
    iniciarSesion,
    obtenerPerfil
} from "../services/auth";



function Login(){


    const navigate =
        useNavigate();



    const [correo,setCorreo] =
        useState("");



    const [password,setPassword] =
        useState("");



    const [perfil,setPerfil] =
        useState("estudiante");




    async function ingresar(){


        const correoLimpio =
            correo.trim().toLowerCase();



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


            console.log(
                "Login con:",
                correoLimpio
            );



            const usuarioAuth =

                await iniciarSesion(

                    correoLimpio,

                    password

                );





            const perfilUsuario =

                await obtenerPerfil(

                    usuarioAuth.uid

                );





            if(!perfilUsuario){


                alert(
                    "No existe información del usuario"
                );

                return;

            }





            if(
                perfilUsuario.perfil !== perfil
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
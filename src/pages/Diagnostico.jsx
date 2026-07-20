import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { analizarImagen } from "../services/ia";


function Diagnostico() {

  const navigate = useNavigate();

  const location = useLocation();

  const imagenRef = useRef(null);


  const [imagen, setImagen] = useState(null);

  const [estado, setEstado] = useState(
    "Preparando análisis..."
  );

  const [resultado, setResultado] = useState(null);



  useEffect(() => {


    if (!location.state?.archivo) {


      setEstado(
        "No se recibió ninguna imagen"
      );


      return;


    }


    const archivo = location.state.archivo;


    const url = URL.createObjectURL(archivo);


    setImagen(url);


    analizar(url);



    return () => {

      URL.revokeObjectURL(url);

    };


  }, []);



  async function analizar(url) {


    try {


      setEstado(
        "Cargando inteligencia artificial..."
      );


      await new Promise(
        resolve => setTimeout(resolve,500)
      );


      setEstado(
        "Analizando imagen..."
      );



      const img = new Image();


      img.src = url;



      img.onload = async () => {


        try {


          imagenRef.current = img;



          const respuesta =
            await analizarImagen(img);



          setResultado(respuesta);



          setEstado(
            "Análisis completado"
          );



        } catch(error) {


          console.error(
            "Error IA:",
            error
          );


          setEstado(
            "Error al analizar imagen"
          );


        }


      };



    } catch(error) {


      console.error(
        "Error IA:",
        error
      );


      setEstado(
        "Error al analizar la imagen"
      );


    }


  }



  function nuevaFoto() {


    navigate("/carga");


  }



  return (

    <div className="mobile-container">


      <header className="header">

        <h1>
          FitoLente
        </h1>

      </header>



      <main className="content">



        {
          imagen &&

          <div className="image-rounded-container">

            <img

              src={imagen}

              alt="Planta analizada"

            />

          </div>

        }



        <h2>

          {estado}

        </h2>





        {
          resultado &&

          <div className="resultado">


            <h3>
              Diagnóstico:
            </h3>


            <p>
              🌱 {resultado.clase}
            </p>



            <h3>
              Confianza:
            </h3>


            <p>
              {resultado.confianza} %
            </p>




            <h3>
              Recomendación:
            </h3>


            <p>

              {
                obtenerRecomendacion(
                  resultado.clase
                )
              }

            </p>



          </div>

        }





        <div className="button-row">


          <button

            className="btn"

            onClick={nuevaFoto}

          >

            Nueva foto

          </button>




          <button

            className="btn"

            onClick={() => navigate("/menu")}

          >

            Menú

          </button>



        </div>



      </main>



      <div className="footer-bar"></div>



    </div>

  );

}




function obtenerRecomendacion(clase) {


  const recomendaciones = {


    sana:
    "La planta parece saludable. Continúe con sus cuidados normales.",


    trips:
    "Se recomienda revisar hojas afectadas y aplicar control biológico o tratamiento autorizado.",


    pulgon:
    "Revise brotes nuevos y controle la población de insectos.",


    acaros:
    "Aumente humedad ambiental y revise el envés de las hojas.",


    alternaria:
    "Retire hojas afectadas y evite exceso de humedad.",


    mildiu_velloso:
    "Mejore ventilación y reduzca humedad en hojas.",


    podredumbre_blanca:
    "Retire partes afectadas y evite contaminación del suelo.",


    hernia_col:
    "Revise raíces y considere rotación de cultivos.",


    deficiencia_n:
    "Puede existir falta de nitrógeno. Revise fertilización.",


    deficiencia_p:
    "Puede existir falta de fósforo. Revise nutrientes.",


    deficiencia_k:
    "Puede existir falta de potasio. Revise fertilización."


  };



  return (

    recomendaciones[clase]

    ||

    "Consulte un especialista para confirmar el diagnóstico."

  );


}



export default Diagnostico;
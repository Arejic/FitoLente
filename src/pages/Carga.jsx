/*
 * Proyecto: FitoLente
 * Autores:
 * Josue Arturo Juarez Rangel
 * Areli Jimenez Contreras
 * Juan Manuel Valerio Astorga
 *
 * Universidad Tecnológica de Tula-Tepeji
 */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


function Carga() {


  const navigate = useNavigate();


  const inputFoto = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);


  const [imagen, setImagen] = useState("/images/logo.png");
  const [archivo, setArchivo] = useState(null);

  const [camaraActiva, setCamaraActiva] = useState(false);

  const [stream, setStream] = useState(null);



  // Cuando aparece el video, conectar cámara
  useEffect(()=>{


    if(

      camaraActiva &&

      videoRef.current &&

      stream

    ){

      videoRef.current.srcObject = stream;

    }


  },[camaraActiva,stream]);





  // Abrir cámara
  async function seleccionarImagen(){


    try{


      const nuevoStream = await navigator.mediaDevices.getUserMedia({

        video:{

          facingMode:"environment"

        },

        audio:false

      });



      setStream(nuevoStream);

      setCamaraActiva(true);



    }catch(error){


      console.error(
        "Error cámara:",
        error
      );


      // abrir almacenamiento
      inputFoto.current.click();


    }


  }






  // Capturar imagen
  function tomarFoto(){


    const video = videoRef.current;

    const canvas = canvasRef.current;


    if(!video) return;



    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;



    const ctx = canvas.getContext("2d");



    ctx.drawImage(

      video,

      0,

      0,

      canvas.width,

      canvas.height

    );



    canvas.toBlob((blob)=>{


      const foto = new File(

        [blob],

        "foto.jpg",

        {
          type:"image/jpeg"
        }

      );



      setArchivo(foto);


      setImagen(

        URL.createObjectURL(foto)

      );



      cerrarCamara();



    },

    "image/jpeg"

    );



  }





  function cerrarCamara(){


    if(stream){


      stream

      .getTracks()

      .forEach(

        track=>track.stop()

      );


    }


    setStream(null);

    setCamaraActiva(false);


  }







  // Imagen desde almacenamiento
  function cargarImagen(e){


    const file=e.target.files[0];


    if(!file)return;



    setArchivo(file);


    setImagen(

      URL.createObjectURL(file)

    );


  }







  function irDiagnostico(){


    if(!archivo){

      alert(
        "Seleccione una imagen"
      );

      return;

    }


    navigate("/diagnostico",{

      state:{

        archivo

      }

    });


  }







  return (

    <div className="mobile-container">


      <header className="header">

        <h1>FitoLente</h1>

      </header>



      <main className="content">



        <div

          className="image-rounded-container"

          onClick={
            !camaraActiva
            ? seleccionarImagen
            : undefined
          }

        >


        {

        camaraActiva ?


        <video

          ref={videoRef}

          autoPlay

          playsInline

          muted

          className="camera-preview"

        />


        :


        <img

          src={imagen}

          alt="Vista"

        />

        }


        </div>





        {

        camaraActiva &&

        <button

          className="btn"

          onClick={tomarFoto}

        >

          📷 Capturar

        </button>


        }






        <canvas

          ref={canvasRef}

          hidden

        />






        <input

          ref={inputFoto}

          type="file"

          accept="image/*"

          onChange={cargarImagen}

          hidden

        />






        <div className="button-row">


          <button

            className="btn"

            onClick={()=>navigate("/menu")}

          >

            Regresar

          </button>



          <button

            className="btn"

            onClick={irDiagnostico}

          >

            Diagnosticar

          </button>


        </div>




      </main>


    </div>

  );

}


export default Carga;